import { NextRequest, NextResponse } from "next/server";

const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

export async function GET(request: NextRequest) {
  const response = await fetch(`${apiUrl}/api/activity${request.nextUrl.search}`, {
    cache: "no-store",
  });

  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") || "application/json",
    },
  });
}
