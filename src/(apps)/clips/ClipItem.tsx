import { View, Text } from "react-native";
import { memo } from "react";
import UnderstandingLevel from "./UnderstandingLevel";
import { UnderstandingStatus } from "../../types/clip";

interface ClipItemProps {
  title: string;
  source: string;
  timeRange: string;
  duration: string;
  understanding: UnderstandingStatus;
  createdAt: string;
}

export default memo(function ClipItem({
  title,
  source,
  timeRange,
  duration,
  understanding,
  createdAt,
}: ClipItemProps) {
  return (
    <View
      className="flex-row gap-4 rounded-2xl bg-white p-5"
      style={{
        borderCurve: "continuous",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      {/* Thumbnail placeholder with duration badge */}
      <View
        className="h-24 w-40 overflow-hidden rounded-xl bg-slate-100"
        style={{ borderCurve: "continuous" }}
      >
        <View className="flex-1 items-center justify-center">
          <Text className="text-3xl text-gray-400">▶</Text>
        </View>
        {/* Duration badge - bottom right */}
        <View
          className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5"
          style={{ borderCurve: "continuous" }}
        >
          <Text
            className="font-semibold text-[10px] text-white"
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {duration}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View className="flex-1 justify-center gap-2">
        <Text className="font-bold text-lg text-slate-800" numberOfLines={1}>
          {title}
        </Text>
        <Text className="font-medium text-xs text-slate-500" numberOfLines={1}>
          {source} · {timeRange}
        </Text>
        <UnderstandingLevel current={understanding} />
      </View>

      {/* Date */}
      <View className="justify-center">
        <Text
          className="font-medium text-xs text-slate-400"
          style={{ fontVariant: ["tabular-nums"] }}
        >
          {createdAt}
        </Text>
      </View>
    </View>
  );
});
