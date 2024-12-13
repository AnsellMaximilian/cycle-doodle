import { fetchOAuthToken } from "@/utils/fetchOAuth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = await fetchOAuthToken();

    const audiencesResponse = await fetch(
      `https://api.devcycle.com/v1/projects/${process.env.DEVCYCLE_PROJECT}/audiences`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!audiencesResponse.ok) {
      const error = await audiencesResponse.json();
      return NextResponse.json(
        { error: "Failed to fetch audiences", details: error },
        { status: audiencesResponse.status }
      );
    }

    const audiences = await audiencesResponse.json();
    return NextResponse.json(audiences);
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error },
      { status: 500 }
    );
  }
}
