import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/**
 * Fast auth middleware:
 * - Immediately serves /login and /signup when no auth cookie exists (0ms network latency).
 * - Immediately redirects unauthenticated /workspace visits to /login.
 * - Refreshes Supabase session only when auth cookies are present.
 */
export async function middleware(request: NextRequest) {
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");
  const isWorkspaceRoute = request.nextUrl.pathname.startsWith("/workspace");

  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

  // Fast path 1: Unauthenticated visitor accessing /login or /signup
  if (!hasAuthCookie && isAuthRoute) {
    return NextResponse.next();
  }

  // Fast path 2: Unauthenticated visitor accessing protected /workspace
  if (!hasAuthCookie && isWorkspaceRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isWorkspaceRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/workspace/:path*", "/login", "/signup"],
};

