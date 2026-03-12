import { View } from 'react-native';
import StatsCard from './StatsCard';
import { ClipStats } from '../../types/clip';

interface StatsCardGroupProps {
  stats: ClipStats;
}

export default function StatsCardGroup({ stats }: StatsCardGroupProps) {
  return (
    <View className="flex-row gap-3">
      <StatsCard value={stats.total} label="전체 클립" colorClass="text-blue-600" bgClass="bg-blue-50" />
      <StatsCard value={stats.fullyUnderstood} label="완전 이해" colorClass="text-green-600" bgClass="bg-green-50" />
      <StatsCard value={stats.normal} label="보통" colorClass="text-amber-600" bgClass="bg-amber-50" />
      <StatsCard value={stats.notUnderstood} label="이해 안됨" colorClass="text-red-600" bgClass="bg-red-50" />
    </View>
  );
}
