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

export const TEAM_PERKS: Record<TeamKeys, string> = {
  "grid-goblins":
    "Grid Goblins have a larger canvas with 144 tiles instead of the standard 100, allowing them to create sprawling designs and dominate space. This advantage is perfect for players who love to think big and use space to their advantage.",
  "paint-paladins":
    "Paint Paladins have access to an extended palette of 10 colors instead of the standard 5, giving them the ability to create more vibrant and detailed designs. This is ideal for players who prioritize creativity and color diversity.",
  "edit-emperors":
    "Edit Emperors can undo or erase tiles, granting them unmatched control over the canvas. This advantage allows them to perfect their designs by fixing mistakes or refining their artwork, ensuring precision and polish.",
};
