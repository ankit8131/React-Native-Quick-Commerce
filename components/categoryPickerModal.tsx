import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import type { SuperCategory } from "@/utils/superCategoriesResponse";

interface Props {
  visible: boolean;
  onClose: () => void;
  superCategories: SuperCategory[];
  selectedSuperCategoryId?: string;
  onSelect: (id: string) => void;
}

export function CategoryPickerModal({
  visible,
  onClose,
  superCategories,
  selectedSuperCategoryId,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        className="flex-1 items-center justify-center bg-black/40 px-5"
      >
        <Pressable
          onPress={() => {}}
          className="max-h-[80%] w-full rounded-3xl bg-white px-4 pb-2 pt-7"
        >
          <Text className="text-center text-3xl font-semibold text-neutral-900">
            Browse Categories
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="shrink"
            contentContainerClassName="flex-row flex-wrap pt-6"
          >
            {superCategories.map((category) => (
              <Pressable
                key={category.categoryId}
                onPress={() => {
                  onSelect(category.categoryId);
                  onClose();
                }}
                className="mb-6 w-1/3 items-center px-1"
              >
                <View className="aspect-square w-24 overflow-hidden rounded-full bg-neutral-100">
                  <Image
                    source={category.displayAssetUrl}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                    transition={150}
                  />
                </View>
                {category.categoryId === selectedSuperCategoryId ? (
                  <View className="absolute right-3 top-0 h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-brand">
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                ) : null}
                <Text className="mt-2 text-center text-sm text-neutral-800">
                  {category.categoryName}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
