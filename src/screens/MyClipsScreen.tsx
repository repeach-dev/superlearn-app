import { View, Text, Platform } from "react-native";
import { useState } from "react";
import Breadcrumb from "../components/layout/Breadcrumb";
import StatsCardGroup from "../components/clips/StatsCardGroup";
import ClipFilterBar from "../components/clips/ClipFilterBar";
import ClipList from "../components/clips/ClipList";
import { MOCK_CLIPS } from "../data/mockClips";
import { ClipStats, FilterType } from "../types/clip";

const isWeb = Platform.OS === "web";

const stats: ClipStats = {
  total: MOCK_CLIPS.length,
  fullyUnderstood: MOCK_CLIPS.filter((c) => c.understanding === "완전 이해")
    .length,
  normal: MOCK_CLIPS.filter((c) => c.understanding === "보통").length,
  notUnderstood: MOCK_CLIPS.filter((c) => c.understanding === "이해 안됨")
    .length,
};

export default function MyClipsScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");

  const filteredClips =
    activeFilter === "전체"
      ? MOCK_CLIPS
      : MOCK_CLIPS.filter((c) => c.understanding === activeFilter);

  return (
    <View className="flex-1 bg-slate-50">
      <Breadcrumb />

      {/* Content container with max-width */}
      <View className="w-full max-w-screen-xl flex-1 gap-6 self-center px-4 py-6 md:px-6">
        {/* Title - 웹에서는 풀 타이틀, 네이티브에서는 설명만 (헤더에 타이틀 있음) */}
        <View className="gap-2">
          {isWeb ? (
            <Text className="font-extrabold text-3xl tracking-tight text-slate-900">
              나의 클립
            </Text>
          ) : null}
          <Text className="text-base text-slate-500">
            강의에서 이해 안되는 부분을 모아 따로 재생하고 복습하세요.
          </Text>
        </View>

        {/* Stats */}
        <StatsCardGroup stats={stats} />

        {/* Filter + Sort + PlayAll */}
        <ClipFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Clip List */}
        <ClipList clips={filteredClips} />
      </View>
    </View>
  );
}
