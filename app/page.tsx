import Image from "next/image";

import logo from "@/assets/cycle-doodle-logo.svg";
import devCycle from "@/assets/devcycle.svg";
import Link from "next/link";
import Button from "@/components/Button";

export default async function Home() {
  return (
    <div className="flex flex-col items-center py-16">
      <Image src={logo} width={200} height={200} alt="logo" />
      <div className="flex flex-col text-xs font-bold mt-4">
        <div className="text-center">Powered By</div>
        <Link href="https://www.devcycle.com/" target="_blank">
          <Image src={devCycle} width={100} height={100} alt="dev cycle" />
        </Link>
      </div>
      <div className="my-8">
        <h1 className="text-3xl font-bold text-center">Cycle Doodle</h1>
        <p className="text-xl text-center">Draw, Guess, and Vote.</p>
        <div className="flex justify-center mt-4">
          <Link href="/play" className="">
            <Button>Play</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
