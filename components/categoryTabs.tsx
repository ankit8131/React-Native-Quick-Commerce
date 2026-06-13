import { Pressable, ScrollView, Text, View } from "react-native";

import type { CategoryTab } from "@/types/catalog";

interface Props {
  tabs: CategoryTab[];
  activeTabId: string;
  onChange: (tabId: string) => void;
}

export function CategoryTabs({ tabs, activeTabId, onChange }: Props) {
  return (
    <View className="border-b border-black/5">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-6"
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTabId;
          return (
            <Pressable
              key={tab.id}
              onPress={() => onChange(tab.id)}
              className="py-3"
            >
              <Text
                className={
                  active
                    ? "text-base font-semibold text-neutral-900"
                    : "text-base text-neutral-400"
                }
              >
                {tab.name}
              </Text>
              {active ? (
                <View className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-neutral-900" />
              ) : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
