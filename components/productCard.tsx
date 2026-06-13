import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { useCartQty, useCartStore } from "@/store/cart";
import type { Product } from "@/types/catalog";

export function ProductCard({ product }: { product: Product }) {
  const qty = useCartQty(product.id);
  const add = useCartStore((s) => s.add);
  const decrement = useCartStore((s) => s.decrement);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="flex-1 rounded-2xl bg-white p-2"
    >
      <View className="overflow-hidden rounded-xl bg-neutral-100">
        {product.badge ? (
          <View className="absolute left-2 top-2 z-10 rounded-md bg-green-100 px-2 py-0.5">
            <Text className="text-xs font-semibold text-brand">{product.badge}</Text>
          </View>
        ) : null}
        <Image
          source={product.imageUrl}
          style={{ width: "100%", aspectRatio: 1 }}
          contentFit="cover"
          transition={200}
        />
      </View>

      <Text className="mt-2 text-xs text-neutral-400">{product.weight}</Text>
      <Text className="mt-0.5 text-base font-semibold text-neutral-900" numberOfLines={1}>
        {product.name}
      </Text>
      <Text className="mt-0.5 text-xs text-neutral-400" numberOfLines={1}>
        {product.description}
      </Text>

      <View className="mt-3 flex-row items-center justify-between">
        <View>
          <Text className="text-base font-bold text-neutral-900">₹{product.price}</Text>
          <Text className="text-xs text-neutral-400 line-through">₹{product.mrp}</Text>
        </View>

        {qty === 0 ? (
          <Pressable
            onPress={() => add(product)}
            hitSlop={8}
            className="h-9 w-9 items-center justify-center rounded-full bg-black/5"
          >
            <Ionicons name="add" size={22} color="#14502F" />
          </Pressable>
        ) : (
          <View className="flex-row items-center gap-3 rounded-full bg-brand px-2 py-1">
            <Pressable onPress={() => decrement(product.id)} hitSlop={8}>
              <Ionicons name="remove" size={18} color="#fff" />
            </Pressable>
            <Text className="text-sm font-bold text-white">{qty}</Text>
            <Pressable onPress={() => add(product)} hitSlop={8}>
              <Ionicons name="add" size={18} color="#fff" />
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}
