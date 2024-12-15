"use client";

import { Prompt } from "@/types";
import React from "react";
import PromptCard from "./PromptCard";
import { usePlay } from "@/contexts/PlayContext";
import Loading from "./Loading";

export default function PromptList() {
  const { prompts, loading } = usePlay();
  if (loading) return <Loading />;

  return (
    <div>
      <div className="font-bold text-2xl mb-8 text-center">Prompt Gallery</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompts.map((p) => {
          return <PromptCard key={p.id} prompt={p} />;
        })}
      </div>
    </div>
  );
}
