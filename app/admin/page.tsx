import Button from "@/components/Button";
import { getVariableValue } from "../devcycle";
import PlayContextProvider from "../play/PlayContextProvider";
import Image from "next/image";
import logo from "@/assets/cycle-doodle-logo.svg";
import AdminControl from "./AdminControl";

export default async function AdminPage() {
  const isAdmin = await getVariableValue("is-admin", false);

  if (!isAdmin)
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <Image src={logo} width={200} height={200} alt="logo" />
        <h1 className="text-3xl font-bold mt-16">Access Denied</h1>
        <p>You need to be an admin to access this page.</p>
      </div>
    );

  return (
    <div>
      <PlayContextProvider>
        <AdminControl />
      </PlayContextProvider>
    </div>
  );
}
