"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import TeamSelection from "./TeamSelection";
import PromptList from "./PromptList";
import { usePlay } from "@/contexts/PlayContext";
import Button from "@/components/Button";
import axios from "axios";
import Drawer from "./team-role/Drawer";
import UserInfo from "./UserInfo";
import Voter from "./team-role/Voter";
import Guesser from "./team-role/Guesser";

export default function PlayArea() {
  const {
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
    userTeam,
    teamRole,
  } = usePlay();

  if (!userTeam)
    return <TeamSelection audiences={audiences} setAudiences={setAudiences} />;

  // if (!selectedPrompt) {
  //   return <PromptList prompts={prompts} />;
  // }
  let RoleComponent: null | ReactNode = null;

  switch (teamRole) {
    case "drawer":
      RoleComponent = <Drawer />;

      break;

    case "guesser":
      RoleComponent = <Guesser />;

      break;

    default:
      RoleComponent = <Voter />;
      break;
  }
  return (
    <div className="flex flex-col gap-4">
      <UserInfo />
      <div className={clsx("border border-gray-200 shadow-sm rounded-md p-4")}>
        {RoleComponent}
      </div>
    </div>
  );
}
