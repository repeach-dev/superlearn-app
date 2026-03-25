import { Text, Pressable } from "react-native";

export default function PlayAllButton() {
  return (
    <Pressable
      className="flex-row items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2 shadow-sm"
      style={{ borderCurve: "continuous" }}
    >
      <Text className="font-bold text-sm text-white">▶ 전체 재생</Text>
    </Pressable>
  );
}
