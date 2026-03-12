export const NAV_ITEMS = [
  { label: "나의 강의실", href: "/(tabs)/classroom" },
  { label: "나의 클립", href: "/(tabs)/clips" },
  { label: "학습 자료실", href: "/(tabs)/resources" },
  { label: "과제 제출", href: "/(tabs)/assignments" },
  { label: "공지사항", href: "/(tabs)/notices" },
] as const;

export const ICON = {
  color: "#64748b",
  size: { web: 18, electron: 14, native: 20 },
} as const;

export const LOGO = {
  web: { width: 180, height: 36 },
  electron: { width: 120, height: 24 },
} as const;
