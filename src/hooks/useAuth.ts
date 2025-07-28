"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const supabase = createClient();
  const router = useRouter();

  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);

  const clearError = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const clearCorruptedCookies = () => {
    if (typeof window === 'undefined') return;
    
    try {
      document.cookie.split(";").forEach(function(c) { 
        const cookieName = c.split("=")[0].trim();
        if (cookieName.startsWith('sb-')) {
          document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
      });
      localStorage.clear();
      sessionStorage.clear();
      
      console.log('Cleared corrupted auth cookies');
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  };

  const checkIfUserNeedsOnboarding = async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/user/check-onboarding?userId=${userId}`);
      
      if (!response.ok) {
        console.error('Failed to check onboarding status:', response.status);
        return true;
      }
      
      const data = await response.json();
      return data.needsOnboarding;
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      return true;
    }
  };

  const handleLogin = async () => {
    clearError();

    if (!email || !password) {
      setError("Email & password required");
      return;
    }

    setIsLoading(true);

    try {
      await supabase.auth.signOut();
      clearCorruptedCookies();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login failed:", error.message);
        
        if (error.message.includes("Invalid login credentials")) {
          setError("Incorrect email or password.");
        } else {
          setError(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        setError("Unexpected error. Please try again.");
        setIsLoading(false);
        return;
      }

      const needsOnboarding = await checkIfUserNeedsOnboarding(data.user.id);
      
      if (needsOnboarding) {
        console.log("User needs onboarding, redirecting...");
        router.replace("/onboarding");
      } else {
        console.log("Login successful:", data.user.email);
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred during login.");
      clearCorruptedCookies();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    clearError();

    if (!email || !password) {
      setError("Email & password required");
      return;
    }

    setIsLoading(true);

    try {
      await supabase.auth.signOut();
      clearCorruptedCookies();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          setError("User already exists! Try logging in.");
        } else {
          setError(error.message);
        }
      } else if (data.user) {
        if (data.user.email_confirmed_at) {
          router.replace("/onboarding");
        } else {
          setSuccessMsg("Check your email to confirm your account!");
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("An unexpected error occurred during signup.");
      clearCorruptedCookies();
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (onboardingData: {
    name: string;
    age: number;
    bio?: string;
  }) => {
    clearError();
    setIsLoading(true);

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(onboardingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to complete onboarding');
      }

      setSuccessMsg("Welcome! Your account is now set up.");
      
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      clearCorruptedCookies();
      setSession(null);
      setHasCheckedOnboarding(false);
      router.replace("/login");
    } catch (err) {
      console.error("Sign out error:", err);
      clearCorruptedCookies();
      setSession(null);
      router.replace("/login");
    }
  };

  const handleGoogleLogin = async () => {
    clearError();

    try {
      clearCorruptedCookies();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/callback` },
      });

      if (error) setError(error.message);
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to sign in with Google.");
    }
  };

  const handlePasswordReset = async () => {
    clearError();

    if (!email) return setError("Enter your email first.");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/resetPassword`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMsg("Password reset email sent! Check your inbox.");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Failed to send password reset email.");
    }
  };

  useEffect(() => {
    const init = async () => {
      if (typeof window === 'undefined') return; // Guard for SSR

      try {
        const currentPath = window.location.pathname;
        
        let sessionData;
        try {
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
            clearCorruptedCookies();
            setSession(null);
          } else {
            sessionData = data;
            setSession(data.session);
          }
        } catch (cookieError) {
          console.error('Cookie parsing error:', cookieError);
          clearCorruptedCookies();
          setSession(null);
        }
        
        setIsLoading(false);

        if (sessionData?.session?.user && !hasCheckedOnboarding) {
          setHasCheckedOnboarding(true);
          
          if (currentPath === '/login' || currentPath === '/signup') {
            try {
              const needsOnboarding = await checkIfUserNeedsOnboarding(sessionData.session.user.id);
              if (needsOnboarding) {
                router.replace('/onboarding');
              } else {
                router.replace('/dashboard');
              }
            } catch (err) {
              console.error("Error during init redirect:", err);
            }
          }
        }
      } catch (error) {
        console.error('Init error:', error);
        clearCorruptedCookies();
        setSession(null);
        setIsLoading(false);
      }
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      
      if (_event === 'SIGNED_OUT') {
        setHasCheckedOnboarding(false);
        clearCorruptedCookies();
      }
      
      if (_event === 'SIGNED_IN' && session?.user && !hasCheckedOnboarding) {
        setHasCheckedOnboarding(true);
        
        try {
          const needsOnboarding = await checkIfUserNeedsOnboarding(session.user.id);
          if (needsOnboarding) {
            router.replace('/onboarding');
          } else {
            router.replace('/dashboard');
          }
        } catch (error) {
          console.error('Auth state change error:', error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return {
    session,
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleSignup,
    handleGoogleLogin,
    handlePasswordReset,
    signOut,
    completeOnboarding,
    checkIfUserNeedsOnboarding,
    isLoading,
    error,
    successMsg,
    clearError,
    clearCorruptedCookies,
  };
}
