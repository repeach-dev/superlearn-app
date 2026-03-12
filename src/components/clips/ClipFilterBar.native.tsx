import { View, ScrollView } from 'react-native';
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
    <View className="gap-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FilterTabs activeFilter={activeFilter} onFilterChange={onFilterChange} />
        <View className="ml-3">
          <SortDropdown />
        </View>
      </ScrollView>
      <PlayAllButton />
    </View>
  );
}
