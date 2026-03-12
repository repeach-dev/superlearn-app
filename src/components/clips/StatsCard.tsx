import { View, Text } from "react-native";
import { memo } from "react";

interface StatsCardProps {
  value: number;
  label: string;
  colorClass?: string;
  bgClass?: string;
}

export default memo(function StatsCard({
  value,
  label,
  colorClass,
  bgClass,
}: StatsCardProps) {
  return (
    <View
      className={`flex-1 items-center justify-center gap-1 rounded-2xl p-4 ${bgClass || "border border-slate-100 bg-white"}`}
      style={{
        borderCurve: "continuous",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      }}
    >
      <Text
        className={`font-extrabold text-2xl ${colorClass || "text-slate-800"}`}
        style={{ fontVariant: ["tabular-nums"] }}
      >
        {value}
      </Text>
      <Text className="font-semibold text-xs text-slate-500">{label}</Text>
    </View>
  );
});
