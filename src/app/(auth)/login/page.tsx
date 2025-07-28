"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import Link from "next/link";
import { LogIn, Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/recreated/Logo/logo";
import { SparklesCore } from "@/components/ace/sparkles.tsx/sparkle";
import GradientText from "@/components/bits/TextAnimations/GradientText/GradientText";
import StarBorder from "@/components/bits/Animations/StarBorder/StarBorder";

const LoginForm = () => {
  const {
    email,
    password,
    handleLogin,
    handleGoogleLogin,
    setEmail,
    setPassword,
    error,
    successMsg,
    clearError,
  } = useAuth();

  return (
<main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  <Logo />
  
  <SparklesCore
    id="login-sparkles"
    background="transparent"
    minSize={0.8}
    maxSize={2.0}
    particleDensity={80}
    particleColor="#ffffff"
    speed={1.5}
    className="absolute inset-0 w-full h-full z-0"
  />
      <section
        aria-label="Login Form"
        className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl shadow-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-gray-200 dark:border-neutral-800"
      >

        <div className="flex flex-col items-center mb-6">
          <GradientText
            colors={["#ffffff", "#f8c8dc", "#fff9b0", "#f8c8dc", "#ffffff"]}
            animationSpeed={6}
            showBorder={false}
            className="text-3xl md:text-4xl font-bold text-center mt-4"
          >
            Welcome Back
          </GradientText>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-3"
          onClick={handleGoogleLogin}
        >
          <LogIn className="h-5 w-5" />
          Login with Google
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-neutral-900 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearError();
            handleLogin();
          }}
          className="space-y-4"
        >

          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pr-10"
            />
            <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex justify-end">
          <Link href="/resetPassword">
          Forget Password?
           </Link>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {successMsg && <div className="text-green-500 text-sm text-center">{successMsg}</div>}

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
              <LogIn className="h-5 w-5" />
              Login
            </span>
          </StarBorder>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          New here?{" "}
          <Link href="/signup" className="underline hover:text-pink-500">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginForm;
