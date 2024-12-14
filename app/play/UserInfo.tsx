"use client";

import { usePlay } from "@/contexts/PlayContext";
import { TeamRoleKeys } from "@/types";
import clsx from "clsx";
import React from "react";

const getRoleDesc = (role: TeamRoleKeys) => {
  switch (role) {
    case "drawer":
      return "It's currently your team's turn to draw. Choose one of the empty prompts and submit a drawing.";
    case "guesser":
      return "It's currently your team's turn guess a drawing's prompt. Guess what this drawing is.";

    default:
      // voter
      return "It's currently your team's turn vote on a drawing. Rate this drawing.";
  }
};

export default function UserInfo() {
  const { teamRole, teamValues, userTeam } = usePlay();

  if (!userTeam) return null;

  return (
    <div className={clsx("gap-8 grid grid-cols-2 ")}>
      <div className="border border-gray-200 shadow-sm rounded-md p-4">
        <div className=" font-bold text-xl uppercase">{userTeam.name}</div>
        <p className="text-sm text-left">{userTeam.description}</p>
      </div>
      <div className="border border-gray-200 shadow-sm rounded-md p-4">
        <div className=" font-bold text-xl uppercase">{teamRole}</div>
        <p className="text-sm text-left">{getRoleDesc(teamRole)}</p>
      </div>
    </div>
  );
}
