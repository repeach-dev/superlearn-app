import { View, Text } from 'react-native';
import { memo } from 'react';

interface StatsCardProps {
  value: number;
  label: string;
  colorClass?: string;
  bgClass?: string;
}

export default memo(function StatsCard({ value, label, colorClass, bgClass }: StatsCardProps) {
  return (
    <View
      className={`flex-1 rounded-2xl p-4 items-center justify-center gap-1 ${bgClass || 'bg-white border border-slate-100'}`}
      style={{ borderCurve: 'continuous', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
    >
      <Text
        className={`text-2xl font-extrabold ${colorClass || 'text-slate-800'}`}
        style={{ fontVariant: ['tabular-nums'] }}
      >
        {value}
      </Text>
      <Text className="text-xs font-semibold text-slate-500">{label}</Text>
    </View>
  );
});
