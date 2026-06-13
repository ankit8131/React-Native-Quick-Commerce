import { useQuery } from "@tanstack/react-query";

import {
  fetchCategory,
  fetchProductById,
  fetchProducts,
  fetchSubcategory,
  fetchSuperCategories,
} from "@/lib/api";

export const firstClubKeys = {
  superCategories: ["super-categories"] as const,
  categories: (superCategoryId: string) => ["categories", superCategoryId] as const,
  subcategories: (categoryId: string) => ["subcategories", categoryId] as const,
  products: (categoryId: string, subcategoryId: string) =>
    ["products", categoryId, subcategoryId] as const,
  product: (id: string) => ["product", id] as const,
};

export function useSuperCategories() {
  return useQuery({
    queryKey: firstClubKeys.superCategories,
    queryFn: fetchSuperCategories,
  });
}

export function useCategories(superCategoryId: string) {
  return useQuery({
    queryKey: firstClubKeys.categories(superCategoryId),
    queryFn: () => fetchCategory(superCategoryId),
    enabled: !!superCategoryId,
  });
}

export function useSubcategories(categoryId: string) {
  return useQuery({
    queryKey: firstClubKeys.subcategories(categoryId),
    queryFn: () => fetchSubcategory(categoryId),
    enabled: !!categoryId,
  });
}

export function useProducts(categoryId: string, subcategoryId: string) {
  return useQuery({
    queryKey: firstClubKeys.products(categoryId, subcategoryId),
    queryFn: () => fetchProducts(categoryId, subcategoryId),
    enabled: !!categoryId,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: firstClubKeys.product(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}
