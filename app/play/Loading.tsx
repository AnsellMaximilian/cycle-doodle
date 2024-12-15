import React from "react";

import logo from "@/assets/cycle-doodle-logo.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <Image
        src={logo}
        width={200}
        height={200}
        alt="logo"
        className="animate-spin"
      />
    </div>
  );
}
