import { getVariableValue } from "../devcycle";

export default async function AdminPage() {
  const isAdmin = await getVariableValue("is-admin", false);

  return <div>{isAdmin ? "ADMIN" : "PEASANT"}</div>;
}
