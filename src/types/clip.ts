export type UnderstandingStatus = '미확인' | '이해 안됨' | '보통' | '완전 이해';

export interface Clip {
  id: string;
  title: string;
  source: string;
  timeRange: string;
  duration: string;
  thumbnailUrl: string;
  understanding: UnderstandingStatus;
  createdAt: string;
}

export type FilterType = '전체' | '이해 안됨' | '보통' | '완전 이해';

export type SortType = '최신순' | '오래된순';

export interface ClipStats {
  total: number;
  fullyUnderstood: number;
  normal: number;
  notUnderstood: number;
}
