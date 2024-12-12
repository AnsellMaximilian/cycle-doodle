"use client";

import TEAM_CONFIG from "@/const";
import { JSONObject, TeamConfig } from "@/types";
import { useVariableValue } from "@devcycle/nextjs-sdk";
import clsx from "clsx";
import React, { useState } from "react";

export default function PlayPage() {
  // @ts-ignore
  const teamValues = useVariableValue(
    "team-values",
    // @ts-ignore
    TEAM_CONFIG["grid-goblins"]
  ) as TeamConfig;

  const [selectedColour, setSelectedColour] = useState(teamValues.colors[0]);

  const [content, setContent] = useState<string[]>([]);

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
                selectedColour === c ? "bg-gray-300" : "bg-white"
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
