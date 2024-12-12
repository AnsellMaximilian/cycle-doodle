import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Step 1: Get OAuth Token
    const oauthResponse = await fetch("https://auth.devcycle.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        audience: "https://api.devcycle.com/",
        client_id: process.env.DEVCYCLE_CLIENT_ID || "",
        client_secret: process.env.DEVCYCLE_CLIENT_SECRET || "",
      }),
    });

    if (!oauthResponse.ok) {
      const error = await oauthResponse.json();
      return NextResponse.json(
        { error: "Failed to fetch OAuth token", details: error },
        { status: oauthResponse.status }
      );
    }

    const { access_token } = await oauthResponse.json();

    // Step 2: Fetch Audiences
    const audiencesResponse = await fetch(
      `https://api.devcycle.com/v1/projects/${project}/audiences`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
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
