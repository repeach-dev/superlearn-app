import { useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { SubtitleSection, SubtitleItem } from "./mock-data";

interface SubtitleListProps {
  sections: SubtitleSection[];
  /** 현재 재생 시간 (초) */
  currentTime?: number;
  onSubtitlePress?: (startTime: number) => void;
}

export default function SubtitleList({
  sections,
  currentTime = 0,
  onSubtitlePress,
}: SubtitleListProps) {
  const scrollRef = useRef<ScrollView>(null);
  const itemPositions = useRef<Record<string, number>>({});

  // 현재 시간에 해당하는 자막 찾기
  const activeSubtitleId = findActiveSubtitle(sections, currentTime);

  // currentTime이 바뀔 때 해당 자막 위치로 스크롤
  useEffect(() => {
    if (!activeSubtitleId || !scrollRef.current) return;
    const y = itemPositions.current[activeSubtitleId];
    if (y !== undefined) {
      scrollRef.current.scrollTo({ y: y - 80, animated: true });
    }
  }, [activeSubtitleId]);

  const handleCopy = (subtitle: SubtitleItem) => {
    if (Platform.OS !== "web") return;
    const text = `[${subtitle.timeLabel}] ${subtitle.text}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("복사되었습니다.");
    });
  };

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1"
      showsVerticalScrollIndicator={false}
    >
      {sections.map((section) => (
        <View key={section.id} className="border-b border-[#1a1a2e]">
          {/* 섹션 제목 + 요약 */}
          <View className="gap-1 px-4 pt-4 pb-2">
            <Text className="text-[15px] font-bold text-white">
              {section.title}
            </Text>
            <Text className="text-[13px] leading-5 text-[#bababa]">
              {section.summary}
            </Text>
          </View>

          {/* 개별 자막 */}
          {section.subtitles.map((subtitle) => {
            const isActive = subtitle.id === activeSubtitleId;
            return (
              <Pressable
                key={subtitle.id}
                onPress={() => onSubtitlePress?.(subtitle.startTime)}
                onLayout={(e) => {
                  itemPositions.current[subtitle.id] = e.nativeEvent.layout.y;
                }}
                className={`gap-2 px-4 py-3 ${
                  isActive ? "bg-[rgba(255,59,59,0.08)]" : ""
                }`}
              >
                {/* 시간 + 텍스트 */}
                <View className="flex-row items-start gap-3">
                  <Text
                    className={`font-mono text-[13px] ${
                      isActive ? "font-bold text-[#ff3b3b]" : "text-[#6b7280]"
                    }`}
                  >
                    {subtitle.timeLabel}
                  </Text>
                  <Text
                    className={`flex-1 text-[14px] leading-5 ${
                      isActive ? "text-white" : "text-[#e6e7eb]"
                    }`}
                  >
                    {subtitle.text}
                  </Text>
                </View>

                {/* 활성 아이템에만 자막보기 + 공유 버튼 표시 */}
                {isActive && (
                  <View className="mt-1 flex-row items-center justify-end gap-3">
                    <Pressable
                      onPress={() => onSubtitlePress?.(subtitle.startTime)}
                      className="rounded-full bg-[#ff3b3b] px-3 py-1"
                    >
                      <Text className="text-[11px] font-semibold text-white">
                        자막보기
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => handleCopy(subtitle)}
                      className="flex-row items-center gap-1"
                    >
                      <Text className="text-[11px] text-[#6b7280]">
                        📋 공유
                      </Text>
                    </Pressable>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

/** 현재 시간에 가장 가까운 자막 id를 반환 */
function findActiveSubtitle(
  sections: SubtitleSection[],
  currentTime: number
): string | null {
  let closest: { id: string; diff: number } | null = null;

  for (const section of sections) {
    for (const sub of section.subtitles) {
      if (sub.startTime <= currentTime) {
        const diff = currentTime - sub.startTime;
        if (!closest || diff < closest.diff) {
          closest = { id: sub.id, diff };
        }
      }
    }
  }

  return closest?.id ?? null;
}
