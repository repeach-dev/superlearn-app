import { FlatList, View } from "react-native";
import ClipItem from "./ClipItem";
import { Clip } from "../../types/clip";

interface ClipListProps {
  clips: Clip[];
}

export default function ClipList({ clips }: ClipListProps) {
  return (
    <FlatList
      data={clips}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ClipItem
          title={item.title}
          source={item.source}
          timeRange={item.timeRange}
          duration={item.duration}
          understanding={item.understanding}
          createdAt={item.createdAt}
        />
      )}
      ItemSeparatorComponent={() => <View className="h-3" />}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
