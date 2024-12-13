import { auth } from "@/auth";
import { fetchOAuthToken } from "@/utils/fetchOAuth";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized: No session or email found" },
      { status: 401 }
    );
  }

  const userId = session.user.email;

  const { audienceId } = await req.json();
  const projectId = process.env.DEVCYCLE_PROJECT;
  if (!audienceId || !projectId) {
    return NextResponse.json(
      { error: "audienceId, userId, and projectId are required" },
      { status: 400 }
    );
  }

  try {
    const token = await fetchOAuthToken();

    const { data: audiences } = await axios.get(
      `https://api.devcycle.com/v1/projects/${projectId}/audiences`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const teamAudiences = audiences.filter((audience: any) => {
      return ["grid-goblins", "paint-paladins", "edit-emperors"].includes(
        audience.key
      );
    });

    const userInAudience = teamAudiences.find((audience: any) => {
      return audience.filters.filters.some((filter: any) => {
        return (
          filter.type === "user" &&
          filter.subType === "user_id" &&
          filter.values.includes(userId)
        );
      });
    });

    if (userInAudience) {
      return NextResponse.json(
        { error: "User is already in an audience" },
        { status: 400 }
      );
    }

    // Find the target audience by ID
    const targetAudience = teamAudiences.find(
      (audience: any) => audience._id === audienceId
    );

    if (!targetAudience) {
      return NextResponse.json(
        { error: "Invalid audience ID" },
        { status: 404 }
      );
    }

    let updatedFilters;

    const existingFilter = targetAudience.filters.filters.find(
      (filter: any) => filter.type === "user" && filter.subType === "user_id"
    );

    if (existingFilter) {
      // Add the user's email to the values array if not already included
      if (!existingFilter.values.includes(session.user.email)) {
        existingFilter.values.push(session.user.email);
      }
      updatedFilters = [...targetAudience.filters.filters];
    } else {
      // Add a new user_id filter
      updatedFilters = [
        ...targetAudience.filters.filters,
        {
          type: "user",
          subType: "user_id",
          comparator: "=",
          values: [session.user.email],
        },
      ];
    }

    const updatedAudience = {
      name: targetAudience.name,
      key: targetAudience.key,
      description: targetAudience.description,
      filters: {
        ...targetAudience.filters,
        filters: updatedFilters,
      },
      tags: [],
    };

    const patchResponse = await axios.patch(
      `https://api.devcycle.com/v1/projects/${projectId}/audiences/${audienceId}`,
      updatedAudience,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (patchResponse.status === 200) {
      return NextResponse.json(patchResponse.data);
    } else {
      return NextResponse.json(
        { error: "Failed to update audience" },
        { status: patchResponse.status }
      );
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details:
          error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 }
    );
  }
}
