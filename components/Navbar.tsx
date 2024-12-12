import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/cycle-doodle-logo.svg";
import { auth, signIn, signOut } from "@/auth";
import Button from "./Button";

const LinkItem = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Link href={href} className="hover:underline">
        {label}
      </Link>
    </li>
  );
};

export default async function Navbar() {
  const session = await auth();

  console.log({ session });
  return (
    <header className="border-b border shadow-md">
      <nav className="mx-auto container p-4 flex items-center gap-8">
        <Link href="/">
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <ul className="flex items-center gap-4">
          <LinkItem href="/" label="Home" />
        </ul>
        <div className="ml-auto items-center flex gap-2">
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit">Sign Out</Button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button type="submit">Sign In</Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
