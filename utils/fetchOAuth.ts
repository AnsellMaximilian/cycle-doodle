import axios from "axios";

export async function fetchOAuthToken() {
  const response = await axios.post(
    "https://auth.devcycle.com/oauth/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      audience: "https://api.devcycle.com/",
      client_id: process.env.DEVCYCLE_CLIENT_ID || "",
      client_secret: process.env.DEVCYCLE_CLIENT_SECRET || "",
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch OAuth token");
  }

  return response.data.access_token;
}
