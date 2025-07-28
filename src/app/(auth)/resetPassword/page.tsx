"use client";

import { useState } from "react";
import { Input } from "@/components/shadcn/ui/input";
import { Mail, Send } from "lucide-react";
import Logo from "@/components/recreated/Logo/logo";
import { SparklesCore } from "@/components/ace/sparkles.tsx/sparkle";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";
import { createBrowserClient } from "@supabase/ssr";

export default function ForgotPasswordPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email) {
      setMessage("Please enter your email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password reset link sent! Check your email.");
    }

    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black">
      <Logo />


      <SparklesCore
        id="forgot-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={120}
        particleColor="#FFFFFF"
        className="absolute inset-0 w-full h-full z-0"
      />

      <section
        aria-label="Forgot Password"
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
            Forgot Password
          </GradientText>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pr-10"
            />
            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          {message && (
            <div
              className={`text-sm text-center ${
                message.startsWith("✅")
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
              <Send className="h-5 w-5" />
              {loading ? "Sending..." : "Send Reset Link"}
            </span>
          </StarBorder>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          Remembered your password?{" "}
          <a href="/login" className="underline hover:text-pink-500">
            Back to login
          </a>
        </p>
      </section>
    </main>
  );
}
