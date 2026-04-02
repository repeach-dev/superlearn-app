import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

interface RecentLecture {
  id: string;
  title: string;
  instructor: string;
  duration: string;
}

const MOCK_RECENT: RecentLecture[] = [
  {
    id: "1",
    title: "[1강] 수학 논리학의 기초 - 명제와 논리 연산",
    instructor: "김강사",
    duration: "45:32",
  },
  {
    id: "2",
    title: "[2강] 3교시 EBS 문학 독해 - 현대시 분석",
    instructor: "박국어",
    duration: "38:15",
  },
  {
    id: "3",
    title: "[3강] 영어 독해 기본 - Reading Comprehension",
    instructor: "이영어",
    duration: "42:00",
  },
];

function LectureCard({ lecture }: { lecture: RecentLecture }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/player")}
      className="rounded-[18px] overflow-hidden mx-[8px]"
    >
      {/* 썸네일 placeholder */}
      <View className="h-[152px] bg-[#2a2a2a] items-center justify-center">
        <View className="flex-row items-center gap-[16px]">
          <View className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.2)] items-center justify-center">
            <Text className="text-[#1a1a1a] dark:text-white text-[18px]">▶</Text>
          </View>
          <View className="w-[40px] h-[40px] rounded-full bg-[rgba(255,255,255,0.2)] items-center justify-center">
            <Text className="text-[#1a1a1a] dark:text-white text-[14px]">🕐</Text>
          </View>
        </View>
      </View>
      {/* 정보 */}
      <View className="bg-[#e5e5e5] dark:bg-[#353535] px-[16px] py-[10px] gap-[4px] h-[72px]">
        <Text
          className="text-[16px] font-medium text-[#1a1a1a] dark:text-white"
          numberOfLines={1}
        >
          {lecture.title}
        </Text>
        <Text className="text-[13px] font-medium text-[#888888] dark:text-[#bababa]">
          {lecture.instructor} {lecture.duration}
        </Text>
      </View>
    </Pressable>
  );
}

export default function RecentLectures() {
  return (
    <View className="bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(81,81,81,0.3)] rounded-[18px] py-[20px] gap-[18px]">
      <Text className="text-[24px] font-bold text-[#333333] dark:text-[#e6e7eb] text-center">
        최근 본 강의
      </Text>
      {MOCK_RECENT.map((lecture) => (
        <LectureCard key={lecture.id} lecture={lecture} />
      ))}
    </View>
  );
}
