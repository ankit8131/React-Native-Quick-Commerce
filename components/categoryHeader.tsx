import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { CategoryPickerModal } from "@/components/categoryPickerModal";
import { useModal } from "@/hooks/useModal";
import type { SuperCategory } from "@/utils/superCategoriesResponse";

export function CategoryHeader({
  title,
  superCategories,
  selectedSuperCategoryId,
  onSelectSuperCategory,
}: {
  title: string;
  superCategories: SuperCategory[];
  selectedSuperCategoryId?: string;
  onSelectSuperCategory: (id: string) => void;
}) {
  const modal = useModal();

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center gap-3">
        <Pressable
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : undefined)}
        >
          <Ionicons name="arrow-back" size={26} color="#1a1a1a" />
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={modal.open}
          className="flex-row items-center gap-1"
        >
          <Text className="text-2xl font-semibold text-neutral-900">{title}</Text>
          <Ionicons name="chevron-down" size={20} color="#1a1a1a" />
        </Pressable>
      </View>
      <Pressable
        hitSlop={8}
        className="h-10 w-10 items-center justify-center rounded-full bg-black/5"
      >
        <Ionicons name="search" size={20} color="#1a1a1a" />
      </Pressable>

      <CategoryPickerModal
        visible={modal.isOpen}
        onClose={modal.close}
        superCategories={superCategories}
        selectedSuperCategoryId={selectedSuperCategoryId}
        onSelect={onSelectSuperCategory}
      />
    </View>
  );
}
