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
    // get  current configuration
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

    const configurations = response.data;

    // get  active configuration
    const activeConfig = configurations.find(
      (config: any) => config.status === "active"
    );

    if (!activeConfig) {
      throw new Error("No active configuration found");
    }

    // amke sure the active configuration has exactly 3 targets
    if (activeConfig.targets.length !== 3) {
      throw new Error(
        "Active configuration must have exactly 3 targets to cycle audiences"
      );
    }

    // get the current audiences
    const audiences = activeConfig.targets.map(
      (target: any) => target.audience.filters.filters[0]._audiences[0]
    );

    // Perform the cycling
    const cycledAudiences = [audiences[2], audiences[0], audiences[1]];

    // updt the targets with the cycled audiences
    const updatedTargets = activeConfig.targets.map(
      (target: any, index: number) => ({
        _id: target._id,
        name: target.name,
        audience: {
          ...target.audience,
          filters: {
            ...target.audience.filters,
            filters: [
              {
                ...target.audience.filters.filters[0],
                _audiences: [cycledAudiences[index]],
              },
            ],
          },
        },
        distribution: target.distribution,
      })
    );

    // Prepare the request body
    const updatedConfig = {
      targets: updatedTargets,
      status: activeConfig.status,
    };

    // Send the PATCH request to update the configuration
    const patchResponse = await axios.patch(
      `https://api.devcycle.com/v1/projects/${projectId}/features/${featureKey}/configurations?environment=${activeConfig._environment}`,
      updatedConfig,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (patchResponse.status !== 200) {
      throw new Error(
        `Failed to update feature configuration: ${patchResponse.statusText}`
      );
    }

    return patchResponse.data;
  } catch (error: any) {
    console.error("Error cycling team roles:", error.message);
    throw new Error("An unexpected error occurred while cycling team roles");
  }
}
