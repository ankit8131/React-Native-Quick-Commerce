import { View } from "react-native";

const WIDTHS = ["w-12", "w-20", "w-24", "w-16"];

export function SubcategoryChipsSkeleton() {
  return (
    <View className="flex-row gap-2 px-4 py-3">
      {WIDTHS.map((w) => (
        <View key={w} className={`h-9 rounded-full bg-neutral-200 ${w}`} />
      ))}
    </View>
  );
}
