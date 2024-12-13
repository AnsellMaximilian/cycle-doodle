"use client";

import { TEAM_CONFIG } from "@/const";
import { Audience, Prompt, TeamConfig } from "@/types";
import { useVariableValue } from "@devcycle/nextjs-sdk";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { PlayContext } from "@/contexts/PlayContext";

export default function PlayContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // @ts-expect-error No problem
  const teamValues = useVariableValue(
    "team-values",
    // @ts-expect-error No Problem
    TEAM_CONFIG["grid-goblins"]
  ) as TeamConfig;

  const promptsVariable = useVariableValue("prompts", { prompts: [] });

  // @ts-expect-error No problem
  const prompts = promptsVariable.prompts as Prompt[];

  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [loadingAudiences, setLoadingAudiences] = useState(false);

  const [selectedColour, setSelectedColour] = useState(teamValues.colors[0]);

  const [content, setContent] = useState<string[]>([]);
  // PROMPT
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    (async () => {
      const audienceRes = await axios.get("/api/audiences");

      const audiences: Audience[] = audienceRes.data as Audience[];

      setAudiences(audiences);
    })();
  }, []);

  return (
    <PlayContext.Provider
      value={{
        audiences,
        setAudiences,
        content,
        setContent,
        selectedPrompt,
        setSelectedPrompt,
        prompts,
        teamValues,
        selectedColour,
        setSelectedColour,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
}
