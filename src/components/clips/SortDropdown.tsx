import { View, Text, Pressable } from 'react-native';

export default function SortDropdown() {
  return (
    <Pressable
      className="flex-row items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 bg-white"
      style={{ borderCurve: 'continuous' }}
      accessibilityRole="button"
      aria-label="정렬 방식 선택"
    >
      <Text className="text-sm font-semibold text-slate-700">최신순</Text>
      <Text className="text-xs text-slate-400">▼</Text>
    </Pressable>
  );
}
