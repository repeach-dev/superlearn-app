import { View, Text } from "react-native";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ClassroomPage() {
  return (
    <View className="flex-1 bg-gray-50">
      <Breadcrumb />
      <View className="flex-1 items-center justify-center gap-2">
        <Text className="font-bold text-2xl text-gray-300">나의 강의실</Text>
        <Text className="text-sm text-gray-400">준비 중입니다</Text>
      </View>
    </View>
  );
}
