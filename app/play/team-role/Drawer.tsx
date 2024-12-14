"use client";

import Button from "@/components/Button";
import { usePlay } from "@/contexts/PlayContext";
import axios from "axios";
import clsx from "clsx";
import React from "react";
import PromptList from "../PromptList";

export default function Drawer() {
  const {
    selectedPrompt,
    teamValues,
    setContent,
    selectedColour,
    content,
    setSelectedColour,
  } = usePlay();

  if (!selectedPrompt) return <PromptList />;
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center font-bold text-2xl">
        Draw {selectedPrompt.prompt}
      </h1>
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
      <div>
        <Button
          onClick={async () => {
            if (selectedPrompt) {
              try {
                const response = await axios.post("/api/submit-drawing", {
                  featureKey: "prompts",
                  variationKey: "main-prompts",
                  content: content,
                  promptId: selectedPrompt.id,
                });

                console.log({ response });
              } catch (err: any) {
                console.error("Error fetching feature:", err);
              }
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
