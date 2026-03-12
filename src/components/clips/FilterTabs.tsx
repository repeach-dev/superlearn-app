import { View, Text, Pressable } from 'react-native';
import { FilterType } from '../../types/clip';

const FILTERS: FilterType[] = ['전체', '이해 안됨', '보통', '완전 이해'];

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Text className="text-sm font-medium text-slate-500">필터:</Text>
      {FILTERS.map((filter) => {
        const isActive = filter === activeFilter;
        return (
          <Pressable
            key={filter}
            onPress={() => onFilterChange(filter)}
            className={`px-4 py-1.5 rounded-full ${
              isActive
                ? 'bg-slate-800'
                : 'bg-white border border-slate-200'
            }`}
            style={{ borderCurve: 'continuous' }}
            accessibilityRole="button"
            aria-label={`${filter} 필터`}
          >
            <Text
              className={`text-sm font-semibold ${
                isActive ? 'text-white' : 'text-slate-500'
              }`}
            >
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
