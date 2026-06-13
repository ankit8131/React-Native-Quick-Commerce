import { View } from "react-native";

export function ProductCardSkeleton() {
  return (
    <View className="flex-1 rounded-2xl bg-white p-2">
      <View className="aspect-square w-full rounded-xl bg-neutral-200" />
      <View className="mt-3 h-3 w-12 rounded bg-neutral-200" />
      <View className="mt-2 h-4 w-3/4 rounded bg-neutral-200" />
      <View className="mt-2 h-3 w-2/3 rounded bg-neutral-200" />
      <View className="mt-3 flex-row items-center justify-between">
        <View className="h-5 w-12 rounded bg-neutral-200" />
        <View className="h-9 w-9 rounded-full bg-neutral-200" />
      </View>
    </View>
  );
}
