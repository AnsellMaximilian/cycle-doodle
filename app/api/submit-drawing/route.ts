import { fetchOAuthToken } from "@/utils/fetchOAuth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const projectId = process.env.DEVCYCLE_PROJECT;

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is not configured" },
      { status: 500 }
    );
  }

  const { featureKey } = await request.json();

  if (!featureKey) {
    return NextResponse.json(
      { error: "Feature key is required" },
      { status: 400 }
    );
  }

  try {
    const token = await fetchOAuthToken();

    const featureResponse = await axios.get(
      `https://api.devcycle.com/v1/projects/${projectId}/features/${featureKey}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (featureResponse.status === 200) {
      return NextResponse.json(featureResponse.data);
    } else {
      return NextResponse.json(
        { error: "Failed to fetch feature" },
        { status: featureResponse.status }
      );
    }
  } catch (error) {
    console.error("Error fetching feature:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
