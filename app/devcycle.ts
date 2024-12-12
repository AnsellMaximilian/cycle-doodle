import { auth } from "@/auth";
import { setupDevCycle } from "@devcycle/nextjs-sdk/server";

const getUserIdentity = async () => {
  const session = await auth();
  return {
    user_id: session?.user?.email ? session.user.email : "NONE",
  };
};

export const { getVariableValue, getClientContext } = setupDevCycle({
  // Server SDK Key. This will be private and used to retrieve configuration data, so you MUST use the server SDK key.
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? "",
  // Client SDK Key. This will be public and sent to the client, so you MUST use the client SDK key.
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? "",
  userGetter: getUserIdentity,
  options: {},
});
