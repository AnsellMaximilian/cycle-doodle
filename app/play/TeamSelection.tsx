"use client";

import { TEAM_IMAGES } from "@/const";
import { Audience, TeamKeys } from "@/types";
import Image from "next/image";
import React from "react";

export default function TeamSelection({
  audiences,
}: {
  audiences: Audience[];
}) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {audiences.map((a) => {
          return (
            <div
              key={a._id}
              className="rounded-md border border-gray-200 p-4 shadow-md"
            >
              {a.name}
              <Image
                src={TEAM_IMAGES[a.key as TeamKeys]}
                width={100}
                height={100}
                alt={a.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
