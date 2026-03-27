import { useState, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import RepeachPlayer from "./RepeachPlayer";
import CurriculumTab from "./CurriculumTab";
import NoteTab from "./NoteTab";
import BookmarkTab from "./BookmarkTab";
import QnATab from "./QnATab";
import SubtitleList from "./SubtitleList";
import {
  MOCK_COURSE,
  MOCK_LECTURES,
  MOCK_BOOKMARKS,
  MOCK_QNA,
  MOCK_SUBTITLE_SECTIONS,
} from "./mock-data";

interface PlayerPageProps {
  id: string;
}

// 큰 화면: 사이드바 탭 (자막 없음)
const SIDEBAR_TABS = [
  { key: "curriculum", label: "강의목록", icon: "📋" },
  { key: "note", label: "필기모드", icon: "✏️" },
  { key: "bookmark", label: "북마크", icon: "🔖" },
  { key: "qna", label: "QnA", icon: "💬" },
] as const;

// 작은 화면: 자막 탭이 추가됨
const SIDEBAR_TABS_WITH_SUBTITLE = [
  { key: "subtitle", label: "자막", icon: "📝" },
  ...SIDEBAR_TABS,
] as const;

type TabKey = "curriculum" | "note" | "bookmark" | "qna" | "subtitle";

const SIDEBAR_MIN = 280;
const SIDEBAR_MAX = 1800;
const SIDEBAR_DEFAULT = 360;

export default function PlayerPage({ id }: PlayerPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("curriculum");
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { width } = useWindowDimensions();

  const isSidebarMode = width >= 1024;

  // 작은 화면 → 큰 화면 전환 시, 자막 탭이면 강의목록으로 전환
  const effectiveTab =
    isSidebarMode && activeTab === "subtitle" ? "curriculum" : activeTab;

  const tabs = isSidebarMode ? SIDEBAR_TABS : SIDEBAR_TABS_WITH_SUBTITLE;

  const clampWidth = (clientX: number) => {
    const newWidth = window.innerWidth - clientX;
    return Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, newWidth));
  };

  const startMouseResize = useCallback(() => {
    if (Platform.OS !== "web") return;
    setIsResizing(true);

    const onMouseMove = (e: MouseEvent) => {
      setSidebarWidth(clampWidth(e.clientX));
    };
    const onMouseUp = () => {
      setIsResizing(false);
      setIsHovering(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const startTouchResize = useCallback(() => {
    if (Platform.OS !== "web") return;
    setIsResizing(true);

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) setSidebarWidth(clampWidth(touch.clientX));
    };
    const onTouchEnd = () => {
      setIsResizing(false);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };

    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
  }, []);

  const renderTabContent = () => {
    switch (effectiveTab) {
      case "subtitle":
        return (
          <SubtitleList
            sections={MOCK_SUBTITLE_SECTIONS}
            currentTime={currentTime}
          />
        );
      case "curriculum":
        return <CurriculumTab lectures={MOCK_LECTURES} />;
      case "note":
        return <NoteTab />;
      case "bookmark":
        return (
          <BookmarkTab
            bookmarks={MOCK_BOOKMARKS}
            currentTime={MOCK_COURSE.currentTime}
          />
        );
      case "qna":
        return <QnATab items={MOCK_QNA} />;
    }
  };

  const sidebarPanel = (
    <View
      style={isSidebarMode ? { width: sidebarWidth } : undefined}
      className={`bg-[#141425] ${isSidebarMode ? "border-l border-[#2a2a40]" : "flex-1"}`}
    >
      {/* 강좌명 */}
      <View className="border-b border-[#2a2a40] px-4 py-3">
        <Text className="text-[14px] font-bold text-white">
          {MOCK_COURSE.title}
        </Text>
      </View>

      {/* 탭 헤더 */}
      <View className="flex-row border-b border-[#2a2a40]">
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key as TabKey)}
            className={`flex-1 items-center gap-1 py-3 ${
              effectiveTab === tab.key ? "border-b-2 border-red-500" : ""
            }`}
          >
            <Text className="text-[16px]">{tab.icon}</Text>
            <Text
              className={`text-[11px] ${
                effectiveTab === tab.key
                  ? "font-bold text-red-500"
                  : "text-[#6b7280]"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 탭 콘텐츠 */}
      {renderTabContent()}
    </View>
  );

  return (
    <View className="flex-1 bg-[#0a0a1a]">
      <View style={{ flex: 1, flexDirection: isSidebarMode ? "row" : "column" }}>
        {/* 좌측(넓은) / 상단(좁은): 플레이어 + 정보 + 자막(넓은 화면만) */}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* 플레이어 (리사이즈 중 iframe 이벤트 차단용 오버레이 포함) */}
          <View className="relative">
            <RepeachPlayer
              contentId="efed5a3301ca62154c4d13d2c755950a7b3bb3493f888464c23f8048ab731c2d.mp4"
              userId="test-user"
              userPk="1"
              classId="tt"
              onTimeUpdate={(time) => setCurrentTime(time)}
            />
            {isResizing && (
              <View
                className="absolute inset-0"
                style={{ cursor: "col-resize" as any }}
              />
            )}
          </View>

          <PlayerInfo />

          {/* 큰 화면: 자막을 여기에 표시 */}
          {isSidebarMode && (
            <SubtitleList
              sections={MOCK_SUBTITLE_SECTIONS}
              currentTime={currentTime}
            />
          )}

          {/* 작은 화면: 사이드바(자막 탭 포함)를 아래에 표시 */}
          {!isSidebarMode && (
            <View className="min-h-[400px]">{sidebarPanel}</View>
          )}
        </ScrollView>

        {/* 넓은 화면: 리사이저 + 사이드바 */}
        {isSidebarMode && (
          <>
            <View
              // @ts-ignore: web-only mouse/touch events
              onMouseDown={startMouseResize}
              onTouchStart={startTouchResize}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => !isResizing && setIsHovering(false)}
              style={{
                cursor: "col-resize" as any,
                width: 12,
                backgroundColor:
                  isResizing
                    ? "rgba(255, 59, 59, 0.6)"
                    : isHovering
                      ? "rgba(255, 59, 59, 0.35)"
                      : "rgba(255, 255, 255, 0.05)",
              }}
              className="items-center justify-center"
            >
              <View
                className={`h-10 w-1 rounded-full ${
                  isResizing || isHovering
                    ? "bg-[rgba(255,255,255,0.7)]"
                    : "bg-[rgba(255,255,255,0.15)]"
                }`}
              />
            </View>
            {sidebarPanel}
          </>
        )}
      </View>
    </View>
  );
}

function PlayerInfo() {
  return (
    <View className="gap-3 border-b border-[#2a2a40] p-4 lg:p-5">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 gap-2">
          <Text className="text-[18px] font-bold text-white lg:text-[20px]">
            {MOCK_COURSE.currentLecture}
          </Text>
          <Text className="text-[13px] leading-5 text-[#bababa] lg:text-[14px]">
            {MOCK_COURSE.description}
          </Text>
        </View>
        <View className="ml-4 items-center">
          <View className="h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-[#2a2a40]">
            <Text className="text-[14px] font-bold text-white">
              {MOCK_COURSE.progress}%
            </Text>
          </View>
          <Text className="mt-1 text-[11px] text-[#6b7280]">학습 진도율</Text>
          <Text className="text-[11px] text-white">
            {MOCK_COURSE.currentTime} / {MOCK_COURSE.totalTime}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-3">
        <View className="rounded border border-[#2a2a40] px-2 py-1">
          <Text className="text-[12px] text-[#6b7280]">학습 진도</Text>
        </View>
        <Text className="text-[12px] text-[#bababa]">
          진도율 80% 이상 시 활성화 (현재 {MOCK_COURSE.progress}%)
        </Text>
      </View>
    </View>
  );
}
