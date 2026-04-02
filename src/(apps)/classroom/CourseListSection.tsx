import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import {
  StudentPurchaseInfo,
  Course,
  CourseContent,
} from "@/types/student-classroom/student-classroom.interface";
import { usePlayerStore } from "@/stores/player-store";
import { useMyStore } from "@/stores/my.store";

/** 과목별 색상 매핑 (하드코딩, 나중에 API에서 받을 수 있음) */
const SUBJECT_COLORS: Record<string, string> = {
  국어: "#e74c3c",
  수학: "#3498db",
  영어: "#2ecc71",
  과학: "#f39c12",
};

/** 과목 카드 (강좌 목록 상단) */
function SubjectCard({
  name,
  courseCount,
  lectureCount,
}: {
  name: string;
  courseCount: number;
  lectureCount: number;
}) {
  return (
    <View className="w-[224px] h-[140px] rounded-[12px] overflow-hidden bg-[#e5e5e5] dark:bg-[#353535]">
      {/* 상단 이미지 placeholder */}
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: (SUBJECT_COLORS[name] ?? "#515151") + "33" }}
      >
        <Text className="text-[24px] font-bold text-[#1a1a1a] dark:text-white">{name}</Text>
      </View>
      {/* 하단 정보 */}
      <View className="h-[48px] bg-[#e5e5e5] dark:bg-[#353535] flex-row items-center justify-between px-[22px]">
        <View className="flex-row items-center gap-[9px]">
          <Text className="text-[16px] font-semibold text-[#1a1a1a] dark:text-white">{name}</Text>
          <Text className="text-[14px] text-[#888888] dark:text-[#bababa]">
            {courseCount}개 강좌
          </Text>
        </View>
        <Text className="text-[14px] text-[#888888] dark:text-[#bababa]">{lectureCount}강</Text>
      </View>
    </View>
  );
}

/** 아직 수강 전 카드 */
function EmptySubjectCard() {
  return (
    <View className="w-[224px] h-[140px] rounded-[12px] border border-dashed border-[#e5e5e5] dark:border-[#353535] items-center justify-center gap-[8px]">
      <View className="w-[40px] h-[40px] rounded-full bg-[#e0e0e0] dark:bg-[#515151] items-center justify-center">
        <Text className="text-[#1a1a1a] dark:text-white text-[18px]">▶</Text>
      </View>
      <Text className="text-[14px] text-[#333333] dark:text-[#e6e7eb]">아직 수강 전</Text>
    </View>
  );
}

/** 개별 강의 아이템 */
function LectureItem({
  course,
  content,
  purchaseInfo,
}: {
  course: Course;
  content: CourseContent;
  purchaseInfo: StudentPurchaseInfo;
}) {
  const router = useRouter();
  const { setPlayerParams } = usePlayerStore();
  const { my } = useMyStore();
  const progress = content.content?.histories?.[0]?.progress ?? 0;

  const handlePlay = () => {
    if (my) {
      setPlayerParams({
        // contentHash: content.content._id,
        userId: my.email ?? "",
        userPk: my._id ?? "",
        packageProductId: purchaseInfo.product.package._id,
        courseId: course._id,
        contentId: content.content._id,
      });
      router.push("/player");
    }
  };

  return (
    <Pressable
      onPress={handlePlay}
      className="flex-row items-center justify-between py-[8px] px-[20px] gap-[16px]"
    >
      <View className="flex-1 gap-[8px]">
        <Text className="text-[16px] font-medium text-[#1a1a1a] dark:text-white" numberOfLines={1}>
          {course.name}
        </Text>
        <View className="flex-row items-center gap-[12px]">
          <Text className="text-[14px] text-[#888888] dark:text-[#bababa]">
            {course.courseContents?.length ?? 0}강
          </Text>
          {/* 진도 바 */}
          <View className="flex-row items-center gap-[6px]">
            <View className="w-[144px] h-[6px] bg-[#e0e0e0] dark:bg-[#515151] rounded-full overflow-hidden">
              <View
                className="h-full bg-accent rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
            <Text className="text-[14px] font-medium text-[#333333] dark:text-[#e6e7eb]">
              {progress}%
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        onPress={handlePlay}
        className="bg-accent rounded-[8px] px-[12px] py-[6px]"
      >
        <Text className="text-[16px] font-semibold text-[#1a1a1a] dark:text-white">복습하기</Text>
      </Pressable>
    </Pressable>
  );
}

/** 강좌 그룹 (과목별) */
function CourseGroup({
  courseName,
  courses,
  purchaseInfo,
}: {
  courseName: string;
  courses: Course[];
  purchaseInfo: StudentPurchaseInfo;
}) {
  return (
    <View className="gap-[20px]">
      <Text className="text-[18px] font-semibold text-[#1a1a1a] dark:text-white tracking-tight">
        {courseName} 강의 목록
      </Text>
      {courses.map((course) => (
        <View
          key={course._id}
          className="bg-white dark:bg-[#222] rounded-[15px] overflow-hidden"
        >
          {/* 강좌 헤더 */}
          <View className="flex-row items-center gap-[10px] pl-[20px] py-[20px]">
            <View className="w-[42px] h-[39px] rounded-[9px] bg-[#e5e5e5] dark:bg-[#353535] items-center justify-center">
              <Text className="text-[12px] text-[#666666] dark:text-[#949494]">📖</Text>
            </View>
            <View className="gap-[6px]">
              <Text className="text-[16px] font-medium text-[#1a1a1a] dark:text-white">
                {course.name}
              </Text>
              <Text className="text-[14px] text-[#888888] dark:text-[#bababa]">
                {course.courseContents?.length ?? 0}강
              </Text>
            </View>
          </View>
          {/* 구분선 */}
          <View className="h-px bg-[#e5e5e5] dark:bg-[#353535] mx-[20px]" />
          {/* 강의 목록 */}
          {course.courseContents?.map((cc) => (
            <LectureItem
              key={cc.content._id}
              course={course}
              content={cc}
              purchaseInfo={purchaseInfo}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

interface CourseListSectionProps {
  purchaseData?: StudentPurchaseInfo[];
}

export default function CourseListSection({
  purchaseData,
}: CourseListSectionProps) {
  // 모든 과목의 courses를 합산
  const allCourses =
    purchaseData?.flatMap((p) => p.product?.package?.courses ?? []) ?? [];

  // 과목명 기준으로 그룹핑 (간단히 course.name의 앞 단어)
  const subjectMap = new Map<string, Course[]>();
  allCourses.forEach((course) => {
    const subject = course.name?.split(" ")?.[0] ?? "기타";
    const list = subjectMap.get(subject) ?? [];
    list.push(course);
    subjectMap.set(subject, list);
  });

  return (
    <View className="bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(81,81,81,0.3)] rounded-[16px] p-[24px] gap-[18px]">
      {/* 섹션 제목 */}
      <Text className="text-[18px] font-semibold text-[#1a1a1a] dark:text-white tracking-tight">
        강좌 목록
      </Text>

      {/* 과목 카드 목록 */}
      <View className="flex-row gap-[12px] flex-wrap">
        {Array.from(subjectMap.entries()).map(([subject, courses]) => (
          <SubjectCard
            key={subject}
            name={subject}
            courseCount={courses.length}
            lectureCount={courses.reduce(
              (sum, c) => sum + (c.courseContents?.length ?? 0),
              0
            )}
          />
        ))}
        {/* 빈 슬롯 */}
        {subjectMap.size < 3 &&
          Array.from({ length: 3 - subjectMap.size }).map((_, i) => (
            <EmptySubjectCard key={`empty-${i}`} />
          ))}
      </View>

      {/* 구분선 */}
      <View className="h-px bg-[#e5e5e5] dark:bg-[#353535]" />

      {/* 과목별 강의 목록 */}
      {purchaseData?.map((purchase) => {
        const courses = purchase.product?.package?.courses ?? [];
        if (courses.length === 0) return null;
        return (
          <CourseGroup
            key={purchase.productBuyerId}
            courseName={purchase.product.name}
            courses={courses}
            purchaseInfo={purchase}
          />
        );
      })}

      {(!purchaseData || purchaseData.length === 0) && (
        <View className="items-center py-[40px]">
          <Text className="text-[16px] text-[#666666] dark:text-[#949494]">
            수강 중인 강좌가 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
}
