import { Text, Pressable } from "react-native";

export default function SortDropdown() {
  return (
    <Pressable
      className="flex-row items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5"
      style={{ borderCurve: "continuous" }}
      accessibilityRole="button"
      aria-label="정렬 방식 선택"
    >
      <Text className="font-semibold text-sm text-slate-700">최신순</Text>
      <Text className="text-xs text-slate-400">▼</Text>
    </Pressable>
  );
}
