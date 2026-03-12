import { View } from 'react-native';
import FilterTabs from './FilterTabs';
import SortDropdown from './SortDropdown';
import PlayAllButton from './PlayAllButton';
import { FilterType } from '../../types/clip';

type Props = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function ClipFilterBar({ activeFilter, onFilterChange }: Props) {
  return (
    <View className="flex-row items-center justify-between">
      <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <View className="flex-row items-center gap-4">
        <SortDropdown />
        <PlayAllButton />
      </View>
    </View>
  );
}
