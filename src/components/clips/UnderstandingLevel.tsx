import { View, Text, Pressable } from 'react-native';
import { memo } from 'react';
import { UnderstandingStatus } from '../../types/clip';

const LEVELS: UnderstandingStatus[] = ['미확인', '이해 안됨', '보통', '완전 이해'];

const LEVEL_COLORS: Record<UnderstandingStatus, { text: string; bg: string }> = {
  '미확인': { text: 'text-slate-600', bg: 'bg-slate-100' },
  '이해 안됨': { text: 'text-red-700', bg: 'bg-red-100' },
  '보통': { text: 'text-amber-700', bg: 'bg-amber-100' },
  '완전 이해': { text: 'text-green-700', bg: 'bg-green-100' },
};

interface UnderstandingLevelProps {
  current: UnderstandingStatus;
}

export default memo(function UnderstandingLevel({ current }: UnderstandingLevelProps) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Text className="text-xs font-medium text-slate-400">이해도:</Text>
      {LEVELS.map((level) => {
        const isActive = level === current;
        const colors = LEVEL_COLORS[level];
        return (
          <Pressable
            key={level}
            className={`px-2.5 py-0.5 rounded-full ${
              isActive ? colors.bg : 'bg-slate-50'
            }`}
            style={{ borderCurve: 'continuous' }}
            accessibilityRole="button"
            aria-label={`이해도: ${level}`}
          >
            <Text
              className={`text-xs font-semibold ${isActive ? colors.text : 'text-slate-400'}`}
            >
              {level}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});
