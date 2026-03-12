# Design: 나의 클립 (My Clips)

> Plan 참조: `docs/01-plan/features/my-clips.plan.md`

## 1. 파일 구조

```
src/
├── screens/
│   └── MyClipsScreen.tsx              # 메인 페이지 (공통)
├── components/
│   ├── layout/
│   │   ├── Header.web.tsx             # 웹 헤더 (가로 네비)
│   │   ├── Header.native.tsx          # 앱 헤더 (추후)
│   │   └── Breadcrumb.tsx             # 브레드크럼 (웹 전용, 앱에서 숨김)
│   └── clips/
│       ├── StatsCard.tsx              # 통계 카드 단일
│       ├── StatsCardGroup.tsx         # 통계 카드 4개 그룹
│       ├── FilterTabs.tsx             # 필터 탭
│       ├── SortDropdown.tsx           # 정렬 드롭다운
│       ├── PlayAllButton.tsx          # 전체 재생 버튼
│       ├── ClipItem.tsx               # 클립 아이템
│       ├── ClipList.tsx               # 클립 목록
│       └── UnderstandingLevel.tsx     # 이해도 버튼 그룹
├── types/
│   └── clip.ts                        # 타입 정의
└── data/
    └── mockClips.ts                   # 목 데이터
```

## 2. 타입 정의

```typescript
// src/types/clip.ts

export type UnderstandingStatus = '미확인' | '이해 안됨' | '보통' | '완전 이해';

export interface Clip {
  id: string;
  title: string;
  source: string;           // "[2강] EBS 문학 독해"
  timeRange: string;        // "35:00 ~ 40:15"
  duration: string;         // "5:15"
  thumbnailUrl: string;
  understanding: UnderstandingStatus;
  createdAt: string;        // "2026-03-04"
}

export type FilterType = '전체' | '이해 안됨' | '보통' | '완전 이해';

export type SortType = '최신순' | '오래된순';

export interface ClipStats {
  total: number;
  fullyUnderstood: number;  // 완전 이해
  normal: number;           // 보통
  notUnderstood: number;    // 이해 안됨
}
```

## 3. 목 데이터

```typescript
// src/data/mockClips.ts

export const MOCK_CLIPS: Clip[] = [
  {
    id: '1',
    title: '김소월 진달래꽃 분석',
    source: '[2강] EBS 문학 독해',
    timeRange: '35:00 ~ 40:15',
    duration: '5:15',
    thumbnailUrl: '',
    understanding: '완전 이해',
    createdAt: '2026-03-04',
  },
  {
    id: '2',
    title: 'Reading Comprehension 주요 전략',
    source: '[3강] 영어 독해 기본',
    timeRange: '22:00 ~ 28:30',
    duration: '6:30',
    thumbnailUrl: '',
    understanding: '이해 안됨',
    createdAt: '2026-03-03',
  },
  {
    id: '3',
    title: '진리표 작성 예시 풀이',
    source: '[1강] 수학 논리학의 기초',
    timeRange: '30:00 ~ 35:20',
    duration: '5:20',
    thumbnailUrl: '',
    understanding: '미확인',
    createdAt: '2026-03-03',
  },
  {
    id: '4',
    title: '현대시 분석 - 은유와 직유 비교',
    source: '[2강] EBS 문학 독해',
    timeRange: '08:20 ~ 12:10',
    duration: '3:50',
    thumbnailUrl: '',
    understanding: '완전 이해',
    createdAt: '2026-03-02',
  },
  {
    id: '5',
    title: '명제와 논리 연산 핵심 정리',
    source: '[1강] 수학 논리학의 기초',
    timeRange: '12:30 ~ 15:45',
    duration: '3:15',
    thumbnailUrl: '',
    understanding: '보통',
    createdAt: '2026-03-01',
  },
];
```

## 4. 컴포넌트 설계

### 4.1 MyClipsScreen (메인 페이지)
- 모든 하위 컴포넌트를 조합
- ScrollView 기반 레이아웃
- 스케치 단계에서는 상태관리 없이 mock data 직접 사용

```
┌─────────────────────────────────────────┐
│ Header                                  │
├─────────────────────────────────────────┤
│ Breadcrumb (웹만)                       │
├─────────────────────────────────────────┤
│ 제목: "나의 클립"                         │
│ 설명: "강의에서 이해 안되는..."             │
├─────────────────────────────────────────┤
│ StatsCardGroup                          │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐            │
│ │ 5  │ │ 2  │ │ 1  │ │ 1  │            │
│ │전체│ │완전│ │보통│ │이해│             │
│ └────┘ └────┘ └────┘ └────┘            │
├─────────────────────────────────────────┤
│ FilterTabs    SortDropdown  PlayAllBtn  │
├─────────────────────────────────────────┤
│ ClipList                                │
│ ┌─────────────────────────────────────┐ │
│ │ [썸네일] 제목 / 출처 / 이해도 / 날짜  │ │
│ │ [썸네일] 제목 / 출처 / 이해도 / 날짜  │ │
│ │ ...                                 │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 4.2 Header
- **플랫폼 분리**: `Header.web.tsx` / `Header.native.tsx`
- Web: 가로 탭 네비게이션 + 우측 아이콘
- Native: 추후 설계 (스케치에서는 간단한 타이틀만)

### 4.3 Breadcrumb
- Web 전용 (Platform.OS === 'web'일 때만 렌더)
- "나의 강의실 > 나의 클립" 텍스트

### 4.4 StatsCard / StatsCardGroup
- StatsCard: 숫자 + 라벨 (예: "5 전체 클립")
- StatsCardGroup: 4개의 StatsCard를 가로 배치 (flexDirection: row)

### 4.5 FilterTabs
- 탭: 전체 | 이해 안됨 | 보통 | 완전 이해
- 활성 탭은 배경색 표시
- 스케치 단계: 버튼만 배치, 필터 동작은 미구현

### 4.6 SortDropdown
- "최신순" 텍스트 + 드롭다운 아이콘
- 스케치 단계: 텍스트만 표시

### 4.7 PlayAllButton
- "▶ 전체 재생" 버튼
- 스케치 단계: 버튼만 배치

### 4.8 ClipItem
- 가로 레이아웃: 썸네일(좌) + 정보(우)
- 정보: 제목, 출처·시간, UnderstandingLevel, 날짜
- 썸네일: 스케치에서는 회색 플레이스홀더 + 재생시간

### 4.9 UnderstandingLevel
- 가로 버튼 그룹: 미확인 | 이해 안됨 | 보통 | 완전 이해
- 현재 상태에 해당하는 버튼 하이라이트
- 스케치 단계: 버튼만 배치, 클릭 동작 미구현

### 4.10 ClipList
- FlatList (Native) / ScrollView (Web) 로 클립 목록 렌더
- 스케치 단계에서는 공통 컴포넌트로 시작, 필요시 분리

## 5. 플랫폼 분리 전략

| 컴포넌트 | 분리 여부 | 이유 |
|----------|-----------|------|
| Header | `.web.tsx` / `.native.tsx` | 웹은 가로탭, 앱은 다른 네비 |
| Breadcrumb | 공통 (웹에서만 표시) | Platform.OS 체크로 분기 |
| StatsCard | 공통 | 동일 레이아웃 |
| FilterTabs | 공통 | 동일 레이아웃 |
| ClipItem | 공통 | 동일 레이아웃 |
| ClipList | 공통 | FlatList는 양쪽 지원 |

## 6. 구현 순서 (스케치 단계)

| 순서 | 파일 | 설명 |
|------|------|------|
| 1 | `src/types/clip.ts` | 타입 정의 |
| 2 | `src/data/mockClips.ts` | 목 데이터 |
| 3 | `src/components/layout/Header.web.tsx` | 웹 헤더 |
| 4 | `src/components/layout/Header.native.tsx` | 네이티브 헤더 (간단) |
| 5 | `src/components/layout/Breadcrumb.tsx` | 브레드크럼 |
| 6 | `src/components/clips/StatsCard.tsx` | 통계 카드 |
| 7 | `src/components/clips/StatsCardGroup.tsx` | 통계 카드 그룹 |
| 8 | `src/components/clips/FilterTabs.tsx` | 필터 탭 |
| 9 | `src/components/clips/SortDropdown.tsx` | 정렬 드롭다운 |
| 10 | `src/components/clips/PlayAllButton.tsx` | 전체 재생 버튼 |
| 11 | `src/components/clips/UnderstandingLevel.tsx` | 이해도 버튼 |
| 12 | `src/components/clips/ClipItem.tsx` | 클립 아이템 |
| 13 | `src/components/clips/ClipList.tsx` | 클립 목록 |
| 14 | `src/screens/MyClipsScreen.tsx` | 메인 페이지 조합 |
| 15 | `App.tsx` | MyClipsScreen 연결 |

## 7. 스케치 스타일 가이드

스케치 단계에서는 최소한의 NativeWind 클래스만 사용:
- 레이아웃: `flex`, `flex-row`, `items-center`, `justify-between`, `p-4`, `gap-2`
- 텍스트: `text-sm`, `text-lg`, `text-xl`, `font-bold`
- 배경/테두리: `bg-gray-100`, `border`, `border-gray-300`, `rounded`
- 버튼: `bg-white`, `px-3`, `py-1`, `rounded-full`
- 활성 상태: `bg-orange-500 text-white` (필터), `bg-red-500 text-white` (재생)
