import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface AlertCardProps {
  count: number;
}

export default function AlertCard({ count }: AlertCardProps) {
  const router = useRouter();

  if (count <= 0) return null;

  return (
    <Pressable
      onPress={() => router.push("/assignments" as any)}
      className="rounded-[12px] overflow-hidden px-[16px] py-[18px] gap-[12px]"
      style={{ backgroundColor: "rgba(58, 77, 149, 0.5)" }}
    >
      <View className="flex-row items-center gap-[4px]">
        <Text className="text-[24px]">⚠️</Text>
        <Text className="text-[18px] font-semibold text-[#e9eeff]">
          미제출 과제 {count}개
        </Text>
      </View>
      <Text className="text-[16px] text-[#e9eeff]">과제 확인하기 →</Text>
    </Pressable>
  );
}
