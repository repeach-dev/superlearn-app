import { View, Text } from "react-native";

interface StatItem {
  icon: string;
  label: string;
  value: string;
}

const STATS: StatItem[] = [
  { icon: "🕐", label: "총 학습 시간", value: "32시간 15분" },
  { icon: "📚", label: "수강 강좌", value: "6개" },
  { icon: "📝", label: "작성한 노트", value: "53개" },
  { icon: "✅", label: "평균 퀴즈 점수", value: "80점" },
];

interface GreetingSectionProps {
  userName: string;
}

export default function GreetingSection({ userName }: GreetingSectionProps) {
  return (
    <View className="gap-[30px]">
      {/* 인사말 */}
      <View className="flex-row items-center gap-[5px]">
        <Text className="text-[28px] font-bold text-[#1a1a1a] dark:text-white">{userName}</Text>
        <Text className="text-[24px] font-medium text-[#666666] dark:text-[#949494]">
          님 안녕하세요.
        </Text>
      </View>

      {/* 통계 카드 */}
      <View className="flex-row flex-wrap gap-[16px] lg:gap-[24px]">
        {STATS.map((stat) => (
          <View
            key={stat.label}
            className="flex-row items-center gap-[12px] bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(81,81,81,0.3)] rounded-[12px] px-[20px] py-[14px] min-w-[200px] flex-1"
          >
            <View className="w-[40px] h-[40px] bg-[#fde8e8] dark:bg-[#4e2d2d] rounded-[10px] items-center justify-center">
              <Text className="text-[18px]">{stat.icon}</Text>
            </View>
            <View className="gap-[6px]">
              <Text className="text-[14px] font-medium text-[#333333] dark:text-[#e6e7eb] tracking-tight">
                {stat.label}
              </Text>
              <Text className="text-[18px] font-semibold text-[#1a1a1a] dark:text-white tracking-tight">
                {stat.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
