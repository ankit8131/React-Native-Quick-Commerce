import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { useCartCount, useCartSavings } from "@/store/cart";

export function CartBar() {
  const count = useCartCount();
  const savings = useCartSavings();

  if (count === 0) return null;

  return (
    <View className="absolute bottom-8 left-6 right-6 flex-row items-center justify-between rounded-full bg-white px-3 py-2 shadow-lg">
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-green-50">
          <Ionicons name="cart-outline" size={22} color="#14502F" />
        </View>
        <View>
          <Text className="text-base font-semibold text-neutral-900">
            {count} {count === 1 ? "Item" : "Items"} added
          </Text>
          {savings > 0 ? (
            <Text className="text-xs text-neutral-500">
              You saved ₹{savings} on this order
            </Text>
          ) : null}
        </View>
      </View>
      <Pressable className="rounded-full bg-brand px-6 py-3">
        <Text className="text-base font-semibold text-white">View Cart</Text>
      </Pressable>
    </View>
  );
}
