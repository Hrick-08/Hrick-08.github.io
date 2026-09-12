import { NextResponse } from "next/server";

const githubQuery = `
  query {
    user(login: "Hrick-08") {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITPAT_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub contributions are not configured" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: githubQuery }),
      cache: "no-store",
    });
    const payload = await response.json();

    if (!response.ok || payload.errors) {
      return NextResponse.json(
        { error: "Unable to load GitHub contributions" },
        { status: response.ok ? 502 : response.status },
      );
    }

    return NextResponse.json({
      weeks: payload.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [],
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load GitHub contributions" },
      { status: 502 },
    );
  }
}