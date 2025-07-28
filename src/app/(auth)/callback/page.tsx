
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default  function CallbackPage() {
  const router = useRouter();

  useEffect(() => {

    const handleOAuthRedirect = async () => {

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const {error} = await supabase.auth.getSession();
      if (error) {
        console.error("OAuth callback error:", error.message);
      }
      router.push("/dashboard");
    };
    

    handleOAuthRedirect();
  }, [router]);

  return <p>Signing you in...</p>;
}

// the callback page componet is designd to hadle oauth redirecton in NExt.js app and i am using 
// supabase for it 