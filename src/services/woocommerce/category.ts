export interface WCCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WCCategoryInput {
  name: string;
  slug?: string;
}

export interface WCCategoryBatchUpdate {
  delete?: number[];
  create?: WCCategoryInput[];
}
