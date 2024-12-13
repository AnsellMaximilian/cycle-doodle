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

export interface Audience {
  _id: string;
  _project: string;
  name: string;
  key: string;
  description: string;
  source: string;
  filters: {
    operator: "and" | "or";
    filters: Array<{
      type: string;
      subType: string;
      comparator: "=" | "!=" | ">" | "<" | ">=" | "<=";
      values: string[];
    }>;
  };
  _createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  readonly: boolean;
}

export interface Prompt {
  id: string;
  content: string[];
  guesser: string | null;
  drawer: string | null;
  prompt?: string;
}
