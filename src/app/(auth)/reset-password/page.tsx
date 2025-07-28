"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Lock, Check } from "lucide-react";
import Logo from "@/components/recreated/Logo/logo";
import { SparklesCore } from "@/components/ace/sparkles.tsx/sparkle";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";
import { createBrowserClient } from "@supabase/ssr";

export default function ResetPasswordPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsSessionValid(true);
      } else {
        setMessage(" Invalid or expired reset link. Please request again.");
      }
    };

    checkSession();
  }, [supabase.auth]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(" Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(` ${error.message}`);
    } else {
      setMessage(" Password updated successfully! You can now log in.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      <Logo />

      {/* Sparkles Background */}
      <SparklesCore
        id="reset-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={120}
        particleColor="#FFFFFF"
        className="absolute inset-0 w-full h-full z-0"
      />

      <section
        aria-label="Reset Password"
        className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-gray-200 dark:border-neutral-800"
      >
        {/* Heading */}
        <div className="flex flex-col items-center mb-6">
          <GradientText
            colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
            animationSpeed={6}
            showBorder={false}
            className="text-3xl md:text-4xl font-bold text-center mt-4"
          >
            Reset Your Password
          </GradientText>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Enter your new password below.
          </p>
        </div>

        {isSessionValid ? (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            {/* New Password */}
            <div className="relative">
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="pr-10"
              />
              <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>


            <div className="relative">
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10"
              />
              <Check className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>

            {message && (
              <div
                className={`text-sm text-center ${
                  message.startsWith("")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            <StarBorder
              color="pink"
              speed="8s"
              className="group relative inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-semibold text-lg text-white transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span
                className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100
                bg-gradient-to-r from-pink-600 via-pink-500 to-red-500 blur-sm transition-opacity duration-300"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 rounded-[inherit] border border-pink-400/30"
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Updating..." : "Update Password"}
              </span>
            </StarBorder>
          </form>
        ) : (
          <div className="text-center text-red-500 text-sm">{message}</div>
        )}

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          Go back to{" "}
          <a href="/login" className="underline hover:text-pink-500">
            Login
          </a>
        </p>
      </section>
    </main>
  );
}
