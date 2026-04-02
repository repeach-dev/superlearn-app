import { View, Text, Pressable } from "react-native";

type AttendanceStatus = "present" | "absent" | "none";

interface DayAttendance {
  day: string;
  status: AttendanceStatus;
}

const MOCK_ATTENDANCE: DayAttendance[] = [
  { day: "월", status: "present" },
  { day: "화", status: "absent" },
  { day: "수", status: "present" },
  { day: "목", status: "none" },
  { day: "금", status: "none" },
  { day: "토", status: "none" },
  { day: "일", status: "none" },
];

interface CircularProgressProps {
  label: string;
  value: number;
}

function CircularProgress({ label, value }: CircularProgressProps) {
  return (
    <View className="items-center gap-[12px]">
      <Text className="text-[16px] font-medium text-[#1a1a1a] dark:text-white text-center">
        {label}
      </Text>
      {/* 원형 차트 placeholder */}
      <View className="w-[120px] h-[120px] rounded-full border-[8px] border-[#e0e0e0] dark:border-[#515151] items-center justify-center">
        <Text className="text-[30px] font-semibold text-[#1a1a1a] dark:text-white">
          {value}%
        </Text>
      </View>
    </View>
  );
}

function AttendanceDot({ status }: { status: AttendanceStatus }) {
  if (status === "present") {
    return (
      <View className="w-[65px] h-[65px] rounded-full bg-[#2a5a2a] border-[3px] border-[#4ade80] items-center justify-center">
        <Text className="text-[24px]">✓</Text>
      </View>
    );
  }
  if (status === "absent") {
    return (
      <View className="w-[65px] h-[65px] rounded-full bg-[#3b82f6] items-center justify-center">
        <Text className="text-[24px]">✕</Text>
      </View>
    );
  }
  return (
    <View className="w-[65px] h-[65px] rounded-full border-[2px] border-dashed border-[#e0e0e0] dark:border-[#515151]" />
  );
}

export default function AttendanceSection() {
  return (
    <View className="bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(81,81,81,0.3)] rounded-[18px] px-[30px] py-[16px] gap-[20px]">
      {/* 헤더 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-[6px]">
          <Text className="text-[22px]">📅</Text>
          <Text className="text-[18px] font-semibold text-[#1a1a1a] dark:text-white tracking-tight">
            출석 체크
          </Text>
        </View>
        <Pressable className="bg-accent rounded-full px-[17px] py-[8px]">
          <Text className="text-[16px] font-semibold text-[#1a1a1a] dark:text-white">출석하기</Text>
        </Pressable>
      </View>

      {/* 요일 출석 */}
      <View className="flex-row justify-between">
        {MOCK_ATTENDANCE.map((item) => (
          <View key={item.day} className="items-center gap-[4px]">
            <AttendanceDot status={item.status} />
            <Text className="text-[16px] font-medium text-[#333333] dark:text-[#e6e7eb]">
              {item.day}
            </Text>
          </View>
        ))}
      </View>

      {/* 패키지 정보 + 통계 */}
      <View className="flex-row items-center gap-[30px] flex-wrap">
        {/* 패키지 */}
        <View className="gap-[12px]">
          <Text className="text-[16px] font-medium text-[#333333] dark:text-[#e6e7eb]">
            수강중인 패키지 입니다.
          </Text>
          <View className="w-[230px] h-[121px] bg-[#e5e5e5] dark:bg-[#353535] rounded-[10px] items-center justify-center">
            <Text className="text-[14px] text-[#666666] dark:text-[#949494]">패키지 이미지</Text>
          </View>
        </View>

        {/* 원형 차트들 */}
        <CircularProgress label="인강 출석율" value={54} />
        <CircularProgress label="전체 진도율" value={54} />
        <CircularProgress label="과제 제출율" value={54} />
      </View>
    </View>
  );
}
