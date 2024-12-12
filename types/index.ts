export interface Drawing {
  guesser_email: string | null;
  drawer_email: string | null;
  content: string[];
}

export type TeamKeys = "grid-goblins" | "paint-paladins" | "edit-emperors";

export interface TeamConfig {
  gridSize: number;
  colors: string[];
  canEdit: boolean;
}

type JSONArray = JSONValue[];

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export type JSONObject = {
  [key: string]: JSONValue;
};
