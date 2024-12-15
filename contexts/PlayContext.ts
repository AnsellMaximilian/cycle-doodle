import { Audience, Prompt, TeamConfig, TeamRoleKeys } from "@/types";
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
  teamRole: TeamRoleKeys;
  userTeam: Audience | null | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const PlayContext = createContext<PlayContextData | undefined>(
  undefined
);

export const usePlay = (): PlayContextData => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error(
      "userPlay must be used within a corresponding ContextProvider"
    );
  }
  return context;
};
