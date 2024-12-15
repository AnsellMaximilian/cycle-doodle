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
  prompt: string;
  score: null | number;
  guess: null | string;
}

export interface Feature {
  _id: string;
  _project: string;
  source: string;
  status: string;
  type: string;
  name: string;
  key: string;
  description: string;
  _createdBy: string;
  createdAt: string;
  updatedAt: string;
  variations: Variation[];
  controlVariation: string;
  variables: Variable[];
  tags: string[];
  readonly: boolean;
  settings: Settings;
  sdkVisibility: SDKVisibility;
}

export interface Variation {
  _id: string;
  key: string;
  name: string;
  variables: VariationVariables;
}

export interface VariationVariables {
  prompts: PromptsVariable;
}

export interface PromptsVariable {
  key?: string;
  prompts?: Prompt[];
}

export interface Variable {
  _id: string;
  _project: string;
  _feature: string;
  name: string;
  key: string;
  type: string;
  status: string;
  source: string;
  _createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  optInEnabled: boolean;
  publicName: string;
  publicDescription: string;
}

export interface SDKVisibility {
  mobile: boolean;
  client: boolean;
  server: boolean;
}

export type TeamRoleKeys = "guesser" | "drawer" | "voter";
