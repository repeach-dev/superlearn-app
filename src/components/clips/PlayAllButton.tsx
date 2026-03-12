import { Text, Pressable } from 'react-native';

export default function PlayAllButton() {
  return (
    <Pressable
      className="bg-slate-900 px-5 py-2 rounded-full flex-row items-center gap-1.5 shadow-sm"
      style={{ borderCurve: 'continuous' }}
    >
      <Text className="text-white text-sm font-bold">▶ 전체 재생</Text>
    </Pressable>
  );
}
