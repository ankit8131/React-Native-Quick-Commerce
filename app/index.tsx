import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CartBar } from "@/components/cartBar";
import { CategoryHeader } from "@/components/categoryHeader";
import { CategoryTabs } from "@/components/categoryTabs";
import { ProductCard } from "@/components/productCard";
import { ProductCardSkeleton } from "@/components/productCardSkeleton";
import { SubcategoryChips } from "@/components/subcategoryChips";
import { SubcategoryChipsSkeleton } from "@/components/subcategoryChipsSkeleton";
import {
  useCategories,
  useProducts,
  useSubcategories,
  useSuperCategories,
} from "@/hooks/useFirstClub";

const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6"];

export default function CatalogScreen() {
  const insets = useSafeAreaInsets();

  const { data: superCategories, isLoading: superCategoriesLoading } =
    useSuperCategories();

  const [selectedSuperCategoryId, setSelectedSuperCategoryId] = useState<string>();
  const selectedSuperCategory =
    superCategories?.find((s) => s.categoryId === selectedSuperCategoryId) ??
    superCategories?.[1];

  const { data: categories } = useCategories(selectedSuperCategory?.categoryId ?? "");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const selectedCategory = selectedCategoryId ?? categories?.[0]?.id ?? "";
  const [filterId, setFilterId] = useState("all");

  const selectSuperCategory = (id: string) => {
    setSelectedSuperCategoryId(id);
    setSelectedCategoryId(undefined);
    setFilterId("all");
  }

  const { data: subcategories, isLoading: subcategoriesLoading } =
    useSubcategories(selectedCategory);

  const { data: products, isLoading } = useProducts(selectedCategory, filterId);

  if (superCategoriesLoading) {
    return (
      <View
        className="flex-1 items-center justify-center bg-cream"
        style={{ paddingTop: insets.top }}
      >
        <ActivityIndicator color="#14502F" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream" style={{ paddingTop: insets.top }}>
      <CategoryHeader
        title={selectedSuperCategory?.categoryName ?? ""}
        superCategories={superCategories ?? []}
        selectedSuperCategoryId={selectedSuperCategory?.categoryId}
        onSelectSuperCategory={selectSuperCategory}
      />

      {categories ? (
        <CategoryTabs
          tabs={categories}
          activeTabId={selectedCategory}
          onChange={(id) => {
            setSelectedCategoryId(id);
            setFilterId("all");
          }}
        />
      ) : null}

      {subcategoriesLoading || !subcategories ? (
        <SubcategoryChipsSkeleton />
      ) : (
        <SubcategoryChips
          subcategories={subcategories}
          activeSubcategoryId={filterId}
          onChange={setFilterId}
        />
      )}

      {isLoading || !products ? (
        <FlatList
          key="skeletons"
          data={SKELETON_KEYS}
          keyExtractor={(k) => k}
          numColumns={2}
          renderItem={() => <ProductCardSkeleton />}
          columnWrapperClassName="gap-3 px-4"
          contentContainerClassName="gap-3 pt-1"
          scrollEnabled={false}
        />
      ) : products.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-base text-neutral-400">No products here yet.</Text>
        </View>
      ) : (
        <FlatList
          key="products"
          data={products.length % 2 === 1 ? [...products, null] : products}
          keyExtractor={(p, i) => p?.id ?? `spacer-${i}`}
          numColumns={2}
          renderItem={({ item }) =>
            item ? <ProductCard product={item} /> : <View className="flex-1" />
          }
          columnWrapperClassName="gap-3 px-4"
          contentContainerClassName="gap-3 pt-1 pb-28"
          showsVerticalScrollIndicator={false}
        />
      )}
      <CartBar />
    </View>
  );
}
