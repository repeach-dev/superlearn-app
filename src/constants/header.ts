export const NAV_ITEMS = [
  { label: "나의 강의실", href: "/classroom" },
  { label: "나의 클립", href: "/clips" },
  { label: "학습 자료실", href: "/resources" },
  { label: "과제 제출", href: "/assignments" },
  { label: "공지사항", href: "/notices" },
] as const;

export const ICON = {
  color: "#64748b",
  size: { web: 18, electron: 14, native: 20 },
} as const;

export const LOGO = {
  web: { width: 180, height: 36 },
  electron: { width: 120, height: 24 },
} as const;
