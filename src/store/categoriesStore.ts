import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Category } from "../types/product";

type CategoriesState = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

const useCategoriesStore = create<CategoriesState>()(
  devtools(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
    }),
    { name: "CategoriesStore" }
  )
);

export default useCategoriesStore;
