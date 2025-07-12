import { NextResponse } from "next/server";

export function middleware(request) {
  const sessionId = request.cookies.get("sessionId")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/my-jobs") ||
    pathname.startsWith("/applies-jobs") ||
    pathname.startsWith("/post-job");

  // ✅ যদি logged-in থাকে → login/register এ ঢুকতে না দেয়
  if (sessionId && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ যদি logged-in না থাকে → protected route এ ঢুকতে না দেয়
  if (!sessionId && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/my-jobs",
    "/applies-jobs",
    "/post-job",
  ],
};
