import { TeamConfig, TeamKeys } from "@/types";
import ggImg from "@/assets/grid-goblins.svg";

import eeImg from "@/assets/edit-emperors.svg";

import ppImg from "@/assets/paint-paladins.svg";

export const TEAM_CONFIG: Record<TeamKeys, TeamConfig> = {
  "grid-goblins": {
    gridSize: 144,
    colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"],
    canEdit: false,
  },
  "paint-paladins": {
    gridSize: 100,
    colors: [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#A133FF",
      "#F1C40F",
      "#1ABC9C",
      "#E74C3C",
      "#9B59B6",
      "#2980B9",
    ],
    canEdit: false,
  },
  "edit-emperors": {
    gridSize: 100,
    colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"],
    canEdit: true,
  },
};

export const TEAM_IMAGES: Record<TeamKeys, string> = {
  "edit-emperors": eeImg,
  "grid-goblins": ggImg,
  "paint-paladins": ppImg,
};
