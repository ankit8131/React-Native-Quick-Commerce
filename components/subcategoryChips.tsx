import { Pressable, ScrollView, Text } from "react-native";

import type { Filter } from "@/types/catalog";

interface Props {
  subcategories: Filter[];
  activeSubcategoryId: string;
  onChange: (subcategoryId: string) => void;
}

export function SubcategoryChips({ subcategories, activeSubcategoryId, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="shrink-0 grow-0"
      style={{ height: 60 }}
      contentContainerClassName="items-center px-4 py-3 gap-2"
    >
      {subcategories.map((subcategory) => {
        const active = subcategory.id === activeSubcategoryId;
        return (
          <Pressable
            key={subcategory.id}
            onPress={() => onChange(subcategory.id)}
            className={
              active
                ? "rounded-full bg-brand px-4 py-2"
                : "rounded-full border border-black/10 bg-white px-4 py-2"
            }
          >
            <Text
              className={
                active
                  ? "text-sm font-medium text-white"
                  : "text-sm text-neutral-700"
              }
            >
              {subcategory.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
