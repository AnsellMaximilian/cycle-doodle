import { usePlay } from "@/contexts/PlayContext";
import { Prompt } from "@/types";
import clsx from "clsx";
import React from "react";

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  const { setSelectedPrompt } = usePlay();

  const contentFilled = prompt.content.some((c) => !!c);
  return (
    <div
      onClick={() => setSelectedPrompt(prompt)}
      className={clsx(
        "p-4 rounded-md border border-gray-200 w-full aspect-square flex flex-col gap-4 items-center hover:scale-105 cursor-pointer transition-all duration-100"
      )}
    >
      <div className="text-center font-bold">{prompt.prompt}</div>
      <div
        className={clsx(
          prompt.content.length > 100 ? "grid-cols-12" : "grid-cols-10",
          "grid w-[150px]"
        )}
      >
        {Array.from({ length: prompt.content.length }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-full aspect-square bg-white "
              style={{ backgroundColor: prompt.content[i] }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
