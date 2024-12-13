export interface FeatureConfiguration {
  _feature: string;
  _environment: string;
  _createdBy: string;
  status: string;
  startedAt?: string; // Optional, as not all configurations have it
  updatedAt: string;
  targets: Target[];
  readonly: boolean;
  hasStaticConfig: boolean;
}

export interface Target {
  _id: string;
  name: string;
  audience: Audience;
  distribution: Distribution[];
}

export interface Audience {
  name: string;
  filters: Filters;
}

export interface Filters {
  operator: string;
  filters: Filter[];
}

export interface Filter {
  type: string;
  _audiences?: string[];
  comparator: string;
}

export interface Distribution {
  _variation: string;
  percentage: number;
}
