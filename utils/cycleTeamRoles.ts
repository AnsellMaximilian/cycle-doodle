import axios from "axios";

export default async function cycleTeamRoles(
  projectId: string,
  featureKey: string,
  token: string
) {
  if (!projectId || !featureKey) {
    throw new Error("Project ID and Feature Key are required");
  }
  try {
    const response = await axios.get(
      `https://api.devcycle.com/v1/projects/${projectId}/features/${featureKey}/configurations`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch feature configuration: ${response.statusText}`
      );
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching feature configuration:", error.message);
    throw new Error(
      "An unexpected error occurred while fetching feature configuration"
    );
  }
}
