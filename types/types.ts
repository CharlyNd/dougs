export type CategoriesGroup = {
  id: number;
  label: string;
  color: string;
};

export type Category = {
  id: number;
  groupId: CategoriesGroup["id"];
  label: string;
  description: string;
};

export type EnrichedCategory = Category & {
  group?: CategoriesGroup;
};

export type Operation = {
  id: number;
  categoryId?: Category["id"];
  amount: number;
  label: string;
  description: string;
  date: string;
  category?: EnrichedCategory;
};

export type Stats = {
  incomesTotal: number;
  outcomesTotal: number;
  balanceTotal: number;
};
