import { View, Text } from 'react-native';
import { memo } from 'react';
import UnderstandingLevel from './UnderstandingLevel';
import { UnderstandingStatus } from '../../types/clip';

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
      className="flex-row bg-white rounded-2xl p-5 gap-4"
      style={{ borderCurve: 'continuous', boxShadow: '0 4px 12px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)' }}
    >
      {/* Thumbnail placeholder with duration badge */}
      <View className="w-40 h-24 bg-slate-100 rounded-xl overflow-hidden" style={{ borderCurve: 'continuous' }}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-3xl">▶</Text>
        </View>
        {/* Duration badge - bottom right */}
        <View className="absolute bottom-1.5 right-1.5 bg-black/70 rounded px-1.5 py-0.5" style={{ borderCurve: 'continuous' }}>
          <Text className="text-white text-[10px] font-semibold" style={{ fontVariant: ['tabular-nums'] }}>
            {duration}
          </Text>
        </View>
      </View>

      {/* Info */}
      <View className="flex-1 gap-2 justify-center">
        <Text className="text-lg font-bold text-slate-800" numberOfLines={1}>
          {title}
        </Text>
        <Text className="text-xs font-medium text-slate-500" numberOfLines={1}>
          {source} · {timeRange}
        </Text>
        <UnderstandingLevel current={understanding} />
      </View>

      {/* Date */}
      <View className="justify-center">
        <Text className="text-xs font-medium text-slate-400" style={{ fontVariant: ['tabular-nums'] }}>
          {createdAt}
        </Text>
      </View>
    </View>
  );
});
