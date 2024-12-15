"use client";

import Button from "@/components/Button";
import { usePlay } from "@/contexts/PlayContext";
import axios from "axios";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import PromptList from "../PromptList";
import { toast } from "react-toastify";

export default function Drawer() {
  const {
    teamValues,
    setContent,
    selectedColour,
    content,
    setSelectedColour,
    prompts,
  } = usePlay();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // if (!selectedPrompt) return <PromptList />;

  const promptToDraw = prompts.find((p) => p.drawer === null);

  if (!promptToDraw) {
    return (
      <div className="text-center min-h-44 flex flex-col items-center justify-center text-lg">
        No prompt to draw. All prompts have been drawn. Please wait for an admin
        to refresh or extend the list of prompts.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center font-bold text-2xl">
        Draw {promptToDraw.prompt}
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
      <div className="flex justify-center">
        <Button
          disabled={isSubmitting}
          onClick={async () => {
            if (promptToDraw) {
              try {
                setIsSubmitting(true);
                const response = await axios.post("/api/submit-drawing", {
                  featureKey: "prompts",
                  variationKey: "main-prompts",
                  content: content,
                  promptId: promptToDraw.id,
                });
                toast.success("Submitted drawing.");
              } catch (err: any) {
                toast.error("Failed to submit drawing");

                setIsSubmitting(false);

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
