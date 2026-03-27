import { View, Text, Pressable, ScrollView } from "react-native";
import { Lecture } from "./mock-data";

interface CurriculumTabProps {
  lectures: Lecture[];
  onSelect?: (lecture: Lecture) => void;
}

export default function CurriculumTab({ lectures, onSelect }: CurriculumTabProps) {
  return (
    <ScrollView className="flex-1">
      {lectures.map((lecture) => (
        <Pressable
          key={lecture.id}
          onPress={() => onSelect?.(lecture)}
          className={`flex-row items-center gap-3 border-b border-[#2a2a40] px-4 py-4 ${
            lecture.isActive ? "bg-[#1a1a2e]" : ""
          }`}
        >
          <View
            className={`h-2 w-2 rounded-full ${
              lecture.isActive ? "bg-red-500" : "bg-transparent"
            }`}
          />
          <View className="flex-1 gap-1">
            <Text
              className={`text-[14px] ${
                lecture.isActive
                  ? "font-bold text-white"
                  : "font-normal text-[#e6e7eb]"
              }`}
            >
              {lecture.title}
            </Text>
            <Text className="text-[12px] text-[#6b7280]">{lecture.duration}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
