import { View, Text } from 'react-native';

export default function AssignmentsPage() {
  return (
    <View className="flex-1 bg-gray-50 items-center justify-center gap-2">
      <Text className="text-2xl font-bold text-gray-300">과제 제출</Text>
      <Text className="text-sm text-gray-400">준비 중입니다</Text>
    </View>
  );
}
