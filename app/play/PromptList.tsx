"use client";

import { userPlay } from "@/contexts/PlayContext";
import { Prompt } from "@/types";
import clsx from "clsx";
import React from "react";

export default function PromptList({ prompts }: { prompts: Prompt[] }) {
  const { setSelectedPrompt } = userPlay();
  return (
    <div>
      <div className="font-bold text-xl mb-4">List of Prompts</div>
      <div className="grid grid-cols-3 gap-4">
        {prompts.map((p) => {
          return (
            <div
              onClick={() => setSelectedPrompt(p)}
              key={p.id}
              className={clsx(
                "p-4 rounded-md border border-gray-200 w-full aspect-square"
              )}
            >
              {p.prompt}
            </div>
          );
        })}
      </div>
    </div>
  );
}
