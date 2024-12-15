"use client";

import { TEAM_CONFIG } from "@/const";
import { Audience, Prompt, TeamConfig, TeamRoleKeys } from "@/types";
import { useVariableValue } from "@devcycle/nextjs-sdk";
import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { PlayContext } from "@/contexts/PlayContext";
import { useSession } from "next-auth/react";

export default function PlayContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();

  // @ts-expect-error No problem
  const teamValues = useVariableValue(
    "team-values",
    // @ts-expect-error No Problem
    TEAM_CONFIG["paint-paladins"]
  ) as TeamConfig;

  const promptsVariable = useVariableValue("prompts", { prompts: [] });
  const teamRole = useVariableValue("team-role", "drawer") as TeamRoleKeys;

  // @ts-expect-error No problem
  const prompts = promptsVariable.prompts as Prompt[];

  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedColour, setSelectedColour] = useState(teamValues.colors[0]);

  const [content, setContent] = useState<string[]>([]);
  // PROMPT
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    (async () => {
      const audienceRes = await axios.get("/api/audiences");

      const audiences: Audience[] = audienceRes.data as Audience[];

      setAudiences(audiences);

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setContent([]);
  }, [teamRole]);

  const userTeam = audiences.find((a) =>
    a.filters.filters.some((f) => f.values.includes(session?.user?.email || ""))
  );

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
        teamRole,
        userTeam,
        loading,
        setLoading,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
}
