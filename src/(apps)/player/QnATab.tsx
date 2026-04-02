import { View, Text, ScrollView } from "react-native";
import { QnAItem } from "./mock-data";

interface QnATabProps {
  items: QnAItem[];
}

export default function QnATab({ items }: QnATabProps) {
  return (
    <ScrollView className="flex-1">
      <View className="gap-3 p-4">
        {items.map((item) => (
          <View
            key={item.id}
            className="gap-3 rounded-xl bg-[#1e1e35] p-4"
          >
            {/* 질문 헤더 */}
            <View className="flex-row items-center justify-between">
              <Text className="text-[16px] font-bold text-[#1a1a1a] dark:text-white">
                {item.author}
              </Text>
              <Text className="text-[13px] text-[#6b7280]">{item.date}</Text>
            </View>

            {/* 질문 내용 */}
            <Text className="text-[15px] leading-6 text-[#333333] dark:text-[#e6e7eb]">
              {item.question}
            </Text>

            {/* 답변 */}
            {item.answer ? (
              <View className="gap-2 rounded-lg border-l-2 border-[#ff5b5c] bg-[#252540] p-3">
                <Text className="text-[13px] font-bold text-[#ff5b5c]">
                  {item.answer.label}
                </Text>
                <Text className="text-[14px] leading-5 text-[#888888] dark:text-[#bababa]">
                  {item.answer.content}
                </Text>
              </View>
            ) : (
              <Text className="text-[13px] text-[#6b7280]">답변 대기 중</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
