import { View, Text } from "react-native";

interface StatsCardProps {
  value: number;
  label: string;
  color?: string;
}

export default function StatsCard({ value, label, color = "#6366f1" }: StatsCardProps) {
  return (
    <View className="flex-1 items-center gap-1 rounded-xl bg-[#222] p-4 lg:rounded-[15px] lg:p-5">
      <Text
        style={{ color }}
        className="text-[24px] font-semibold lg:text-[30px]"
      >
        {value}
      </Text>
      <Text className="text-[12px] font-medium text-[#e6e7eb] lg:text-[18px]">
        {label}
      </Text>
    </View>
  );
}
