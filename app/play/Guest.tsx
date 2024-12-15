import Image from "next/image";
import React from "react";
import logo from "@/assets/cycle-doodle-logo.svg";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";

export default function Guest() {
  const session = useSession();

  return (
    <div className="flex flex-col justify-center items-center py-16">
      <Image src={logo} width={200} height={200} alt="logo" />
      {session.status === "loading" ? (
        <>
          <h1 className="text-3xl font-bold mt-16">Loading...</h1>
          <p>Getting session data...</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mt-16">Login to Play</h1>
          <p>Please login and select a team before playing.</p>

          <Button
            className="mt-4"
            onClick={async () => {
              await signIn("google");
            }}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
}
