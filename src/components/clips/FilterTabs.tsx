import { View, Text, Pressable } from "react-native";
import { FilterType } from "../../types/clip";

const FILTERS: FilterType[] = ["전체", "이해 안됨", "보통", "완전 이해"];

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterTabs({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Text className="font-medium text-sm text-slate-500">필터:</Text>
      {FILTERS.map((filter) => {
        const isActive = filter === activeFilter;
        return (
          <Pressable
            key={filter}
            onPress={() => onFilterChange(filter)}
            className={`rounded-full px-4 py-1.5 ${
              isActive ? "bg-slate-800" : "border border-slate-200 bg-white"
            }`}
            style={{ borderCurve: "continuous" }}
            accessibilityRole="button"
            aria-label={`${filter} 필터`}
          >
            <Text
              className={`font-semibold text-sm ${
                isActive ? "text-white" : "text-slate-500"
              }`}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
