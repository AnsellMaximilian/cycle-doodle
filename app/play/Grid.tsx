"use client";

import { TEAM_CONFIG } from "@/const";
import { Audience, TeamConfig } from "@/types";
import { useVariableValue } from "@devcycle/nextjs-sdk";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import TeamSelection from "./TeamSelection";

export default function Grid({ audiences }: { audiences: Audience[] }) {
  const { data: session } = useSession();

  // @ts-expect-error No problem
  const teamValues = useVariableValue(
    "team-values",
    // @ts-expect-error No Problem
    TEAM_CONFIG["grid-goblins"]
  ) as TeamConfig;

  const [selectedColour, setSelectedColour] = useState(teamValues.colors[0]);

  const [content, setContent] = useState<string[]>([]);

  const userIsInATeam = audiences.some((a) =>
    a.filters.filters.some((f) => f.values.includes(session?.user?.email || ""))
  );

  if (!userIsInATeam) return <TeamSelection audiences={audiences} />;
  return (
    <div className="flex gap-2 items-center">
      <div
        className={`${
          teamValues.gridSize > 100 ? "grid-cols-12" : "grid-cols-10"
        } grid w-[600px] mx-auto border-black border`}
      >
        {Array.from({ length: teamValues.gridSize }).map((_, i) => {
          return (
            <div
              onClick={() => {
                setContent((prev) => {
                  const content = [...prev];

                  if (teamValues.canEdit || !!!content[i]) {
                    content[i] = selectedColour;
                  }
                  return content;
                });
              }}
              key={i}
              className="w-full aspect-square border-black border hover:brightness-90 bg-white cursor-pointer"
              style={{ backgroundColor: content[i] }}
            ></div>
          );
        })}
      </div>
      <div className="p-4 flex flex-col gap-4">
        {teamValues.colors.map((c) => {
          return (
            <div
              onClick={() => setSelectedColour(c)}
              className={clsx(
                "w-10 h-10 rounded-full cursor-pointer hover:brightness-90 p-1 overflow-hidden bg-white border border-white",
                selectedColour === c ? "bg-zinc-200" : "bg-white"
              )}
              key={c}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: c }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
