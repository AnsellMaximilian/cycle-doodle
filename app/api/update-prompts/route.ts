import { getVariableValue } from "@/app/devcycle";
import { auth } from "@/auth";
import cycleTeamRoles from "@/utils/cycleTeamRoles";
import { fetchOAuthToken } from "@/utils/fetchOAuth";
import isGuessCorrect from "@/utils/isGuessCorrect";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Unauthorized: No session or email found" },
      { status: 401 }
    );
  }

  const projectId = process.env.DEVCYCLE_PROJECT;

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is not configured" },
      { status: 500 }
    );
  }

  const { featureKey, variationKey, newPrompts } = await request.json();

  if (!featureKey || !variationKey || !newPrompts) {
    return NextResponse.json(
      {
        error: "Feature key, variation key, newPrompts are required",
      },
      { status: 400 }
    );
  }

  //   const isAdmin = await getVariableValue("is-admin", false);

  //   return NextResponse.json({
  //     admin: isAdmin,
  //   });

  try {
    const token = await fetchOAuthToken();

    const featureResponse = await axios.get(
      `https://api.devcycle.com/v1/projects/${projectId}/features/${featureKey}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const feature = featureResponse.data;

    const variation = feature.variations.find(
      (v: any) => v.key === variationKey
    );

    if (!variation) {
      return NextResponse.json(
        { error: "Variation not found" },
        { status: 404 }
      );
    }

    const prompts = newPrompts;

    const variables = feature.variables.map((v: any) => ({
      name: v.name,
      description: v.description,
      key: v.key,
      _feature: v._feature,
      type: v.type,
      validationSchema: v.validationSchema,
    }));

    const variations = feature.variations.map((v: any) => ({
      key: v.key,
      name: v.name,
      variables: v.variables,
    }));

    const updatedFeature = {
      name: feature.name,
      key: feature.key,
      description: feature.description,
      variables: variables,
      variations: variations.map((v: any) => {
        if (v.key === variationKey) {
          return {
            ...v,
            variables: {
              ...v.variables,
              prompts: {
                ...v.variables.prompts,
                prompts: prompts,
              },
            },
          };
        }
        return v;
      }),
      settings: feature.settings,
      sdkVisibility: feature.sdkVisibility,
      type: feature.type,
      tags: feature.tags,
      controlVariation: feature.controlVariation,
    };

    const patchResponse = await axios.patch(
      `https://api.devcycle.com/v1/projects/${projectId}/features/${featureKey}`,
      updatedFeature,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (patchResponse.status === 200) {
      return NextResponse.json(patchResponse.data);
    } else {
      return NextResponse.json(
        { error: "Failed to update feature" },
        { status: patchResponse.status }
      );
    }
  } catch (error) {
    console.error("Error updating feature:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        details:
          error instanceof Error ? error.message : "Somethwing went wrong",
      },
      { status: 500 }
    );
  }
}
