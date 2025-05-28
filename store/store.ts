import { create } from 'zustand';
import type { Operation, Category, CategoriesGroup } from '~/types/types';

interface OperationStore {
  operations: Operation[];
  setOperations: (ops: Operation[]) => void;
  appendOperations: (ops: Operation[]) => void;
  categories: Category[];
  setCategories: (cats: Category[]) => void;
  groups: CategoriesGroup[];
  setGroups: (groups: CategoriesGroup[]) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  offset: number;
  setOffset: (offset: number) => void;
}

export const useOperationStore = create<OperationStore>((set) => ({
  operations: [],
  setOperations: (ops) => set({ operations: ops }),
  appendOperations: (ops) => set((state) => ({ operations: [...state.operations, ...ops] })),
  categories: [],
  setCategories: (cats) => set({ categories: cats }),
  groups: [],
  setGroups: (groups) => set({ groups }),
  hasMore: true,
  setHasMore: (hasMore) => set({ hasMore }),
  offset: 0,
  setOffset: (offset) => set({ offset }),
}));