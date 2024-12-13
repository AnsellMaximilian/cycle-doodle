import { Audience, Prompt, TeamConfig } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
export interface PlayContextData {
  content: string[];
  setContent: Dispatch<SetStateAction<string[]>>;
  audiences: Audience[];
  setAudiences: Dispatch<SetStateAction<Audience[]>>;
  selectedPrompt: Prompt | null;
  setSelectedPrompt: Dispatch<SetStateAction<Prompt | null>>;
  prompts: Prompt[];
  teamValues: TeamConfig;
  selectedColour: string;
  setSelectedColour: Dispatch<SetStateAction<string>>;
}

export const PlayContext = createContext<PlayContextData | undefined>(
  undefined
);

export const userPlay = (): PlayContextData => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error(
      "userPlay must be used within a corresponding ContextProvider"
    );
  }
  return context;
};
