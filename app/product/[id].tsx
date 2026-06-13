import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useProduct } from "@/hooks/useFirstClub";
import { useCartQty, useCartStore } from "@/store/cart";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { data: product, isLoading } = useProduct(id);

  const qty = useCartQty(id);
  const add = useCartStore((s) => s.add);
  const decrement = useCartStore((s) => s.decrement);

  return (
    <View className="flex-1 bg-cream" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-4 py-3">
        <Pressable
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
        >
          <Ionicons name="arrow-back" size={26} color="#1a1a1a" />
        </Pressable>
      </View>

      {isLoading || !product ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#14502F" />
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerClassName="px-4 pb-32"
            showsVerticalScrollIndicator={false}
          >
            <View className="overflow-hidden rounded-2xl bg-neutral-100">
              {product.badge ? (
                <View className="absolute left-3 top-3 z-10 rounded-md bg-green-100 px-2 py-1">
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

            <Text className="mt-4 text-sm text-neutral-400">{product.weight}</Text>
            <Text className="mt-1 text-2xl font-bold text-neutral-900">{product.name}</Text>
            <Text className="mt-1 text-base text-neutral-500">{product.description}</Text>

            <View className="mt-4 flex-row items-end gap-2">
              <Text className="text-2xl font-bold text-neutral-900">₹{product.price}</Text>
              <Text className="pb-1 text-base text-neutral-400 line-through">₹{product.mrp}</Text>
              {product.mrp > product.price ? (
                <Text className="pb-1 text-sm font-semibold text-brand">
                  Save ₹{product.mrp - product.price}
                </Text>
              ) : null}
            </View>
          </ScrollView>

          <View
            className="absolute bottom-0 left-0 right-0 border-t border-black/5 bg-white px-4 pt-3"
            style={{ paddingBottom: insets.bottom + 12 }}
          >
            {qty === 0 ? (
              <Pressable
                onPress={() => add(product)}
                className="items-center rounded-full bg-brand py-4"
              >
                <Text className="text-base font-semibold text-white">Add to cart</Text>
              </Pressable>
            ) : (
              <View className="flex-row items-center justify-between rounded-full bg-brand px-6 py-2">
                <Pressable onPress={() => decrement(product.id)} hitSlop={12}>
                  <Ionicons name="remove" size={24} color="#fff" />
                </Pressable>
                <Text className="text-lg font-bold text-white">{qty} in cart</Text>
                <Pressable onPress={() => add(product)} hitSlop={12}>
                  <Ionicons name="add" size={24} color="#fff" />
                </Pressable>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}
