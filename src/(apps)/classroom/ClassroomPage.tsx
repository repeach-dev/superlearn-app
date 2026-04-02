import { View, ScrollView, useWindowDimensions } from "react-native";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useGetStudentPurchaseInfoQuery } from "@/queries/studnet-classroom/student-classroom.query";
import { useAuthStore } from "@/stores/auth-store";
import GreetingSection from "./GreetingSection";
import AttendanceSection from "./AttendanceSection";
import CourseListSection from "./CourseListSection";
import AlertCard from "./AlertCard";
import RecentLectures from "./RecentLectures";

export default function ClassroomPage() {
  const { width } = useWindowDimensions();
  const { user } = useAuthStore();
  const { data: purchaseData } = useGetStudentPurchaseInfoQuery();

  const purchases = purchaseData?.data?.studentPurchaseInfo;
  const userName = user?.name ?? "학생";

  // lg(1024px) 이상이면 2단 레이아웃
  const isTwoColumn = width >= 1024;

  return (
    <View className="flex-1 bg-[#f0f0f0] dark:bg-[#090909]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Breadcrumb />
        <View className="px-[16px] lg:px-[60px] py-[24px] gap-[30px] lg:max-w-[1920px] lg:mx-auto w-full">
          {/* 인사말 + 통계 */}
          <GreetingSection userName={userName} />

          {/* 메인 콘텐츠 영역 */}
          <View
            style={{
              flexDirection: isTwoColumn ? "row" : "column",
              gap: 24,
            }}
          >
            {/* 좌측: 출석 + 강좌목록 */}
            <View style={{ flex: isTwoColumn ? 1 : undefined }} className="gap-[24px]">
              <AttendanceSection />
              <CourseListSection purchaseData={purchases} />
            </View>

            {/* 우측: 알림 + 최근 강의 */}
            <View
              style={{ width: isTwoColumn ? 422 : undefined }}
              className="gap-[18px]"
            >
              <AlertCard count={3} />
              <RecentLectures />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
