"use client";

import { Prompt } from "@/types";
import React from "react";
import PromptCard from "./PromptCard";
import { usePlay } from "@/contexts/PlayContext";

export default function PromptList() {
  const { prompts } = usePlay();
  return (
    <div>
      <div className="font-bold text-xl mb-4">List of Prompts</div>
      <div className="grid grid-cols-3 gap-4">
        {prompts.map((p) => {
          return <PromptCard key={p.id} prompt={p} />;
        })}
      </div>
    </div>
  );
}
