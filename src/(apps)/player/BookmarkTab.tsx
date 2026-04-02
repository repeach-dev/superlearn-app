import { View, Text, Pressable, ScrollView } from "react-native";
import { Bookmark } from "./mock-data";

interface BookmarkTabProps {
  bookmarks: Bookmark[];
  currentTime?: string;
  onAdd?: () => void;
  onSelect?: (bookmark: Bookmark) => void;
}

export default function BookmarkTab({
  bookmarks,
  currentTime = "00:00",
  onAdd,
  onSelect,
}: BookmarkTabProps) {
  return (
    <ScrollView className="flex-1">
      {/* 북마크 추가 버튼 */}
      <Pressable
        onPress={onAdd}
        className="mx-4 mt-4 items-center rounded-lg border border-dashed border-[#ff5b5c] py-3"
      >
        <Text className="text-[14px] font-semibold text-[#ff5b5c]">
          + 현재 시점 북마크 추가 ({currentTime})
        </Text>
      </Pressable>

      {/* 북마크 리스트 */}
      <View className="mt-4 gap-2">
        {bookmarks.map((bookmark) => (
          <Pressable
            key={bookmark.id}
            onPress={() => onSelect?.(bookmark)}
            className="flex-row items-center gap-4 border-b border-[#2a2a40] px-4 py-4"
          >
            <View className="rounded bg-[rgba(255,0,0,0.1)] px-2 py-1">
              <Text className="font-mono text-[14px] font-semibold text-[#ff5b5c]">
                {bookmark.time}
              </Text>
            </View>
            <Text className="flex-1 text-[16px] font-semibold text-[#1a1a1a] dark:text-white">
              {bookmark.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
