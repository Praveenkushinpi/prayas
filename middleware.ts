import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/auth/callback",
  "/callback",
  "/resetPassword",
  "/privacy-policy",
  "/terms-of-service",
  "/pricing"
];

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { pathname } = req.nextUrl;

  let session = null;
  try {
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      session = data?.session;
    }
  } catch (error) {
    console.error('Middleware session error:', error);
  }


  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    if ((pathname === "/login" || pathname === "/signup") && session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return response;
  }

  if (pathname === "/onboarding") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return response;
  }

  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|api/).*)",
  ],
};
