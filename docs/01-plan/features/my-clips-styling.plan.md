# Plan: 나의 클립 스타일링 개선 (my-clips-styling)

## 개요
레퍼런스 디자인(스크린샷)과 현재 구현 간 디자인 차이를 수정하고,
vercel web-design-guidelines + react-native-skills 베스트 프랙티스를 적용한다.

## 레퍼런스 vs 현재 구현 차이점

### 1. Primary 색상 오류 (Critical)
- **레퍼런스**: 빨간색 (red-500 계열)
- **현재**: 주황색 (orange-500)
- **영향 범위**: Header 로고, 활성 탭, FilterTabs, PlayAllButton

### 2. Header 활성 탭 스타일
- **레퍼런스**: 빨간 배경 + 흰 글자 rounded pill (`bg-red-500 text-white rounded-full px-4 py-1`)
- **현재**: 주황색 텍스트만 (`text-orange-500 font-bold`)

### 3. Header 우측 아이콘
- **레퍼런스**: 적절한 크기 아이콘, 알림 뱃지("2"), "로그아웃" 텍스트
- **현재**: 작은 이모지, 뱃지 없음, 로그아웃 없음

### 4. Breadcrumb 개선
- **레퍼런스**: `나의 강의실` (링크) `>` `나의 클립` (현재, 볼드/다크)
- **현재**: 전체가 동일한 gray-400 텍스트, `>` 문자 그대로 사용

### 5. Stats 카드 숫자 색상
- **레퍼런스**: 전체=파랑(blue), 완전이해=초록, 보통=주황, 이해안됨=빨강
- **현재**: 전체=gray-800 (파랑이 아님)

### 6. Filter 탭 스타일
- **레퍼런스**: "필터:" 라벨 + outline 스타일 (테두리+텍스트 색상), 비활성=gray border
- **현재**: filled 스타일 (bg-orange-500), "필터:" 라벨 없음

### 7. Sort 드롭다운
- **레퍼런스**: select 박스 스타일 (border + 드롭다운 화살표)
- **현재**: 텍스트 + ▼ 심볼

### 8. ClipItem - 이해도 영역
- **레퍼런스**: "이해도:" 라벨 + outline 스타일 버튼 (테두리), 활성=색상 테두리+텍스트
- **현재**: 라벨 없음, filled 스타일

### 9. ClipItem - 썸네일
- **레퍼런스**: 실제 이미지 자리 + 우하단 duration 뱃지 (어두운 배경)
- **현재**: 회색 박스 + 가운데 ▶ + 텍스트

## 수정 대상 파일

| # | 파일 | 변경 내용 |
|---|------|----------|
| 1 | `Header.web.tsx` | primary→red, 활성탭 pill, 아이콘 개선, 알림뱃지, 로그아웃 |
| 2 | `Breadcrumb.tsx` | chevron 스타일, 현재 페이지 볼드, 링크 색상 분리 |
| 3 | `StatsCardGroup.tsx` | 전체 클립 색상 blue로 변경 |
| 4 | `FilterTabs.tsx` | "필터:" 라벨 추가, outline 스타일로 변경 |
| 5 | `SortDropdown.tsx` | border 박스 + 드롭다운 아이콘 스타일 |
| 6 | `UnderstandingLevel.tsx` | "이해도:" 라벨 추가, outline 스타일 |
| 7 | `ClipItem.tsx` | 썸네일 duration 뱃지 위치 변경 (우하단) |
| 8 | `PlayAllButton.tsx` | 이미 red이므로 확인만 |

## 적용할 가이드라인 (web-design-guidelines)

- **Hover states**: 버튼/링크에 `hover:` 상태 추가
- **Typography**: `text-wrap: balance` 헤딩, tabular-nums 숫자
- **Accessibility**: 아이콘 버튼에 aria-label, 시맨틱 HTML
- **Focus states**: `:focus-visible` 포커스 인디케이터
- **Content handling**: 긴 제목 truncate 처리

## 적용할 가이드라인 (vercel-react-native-skills)

- **ui-pressable**: Pressable 유지
- **ui-styling**: gap, borderCurve: 'continuous'
- **rendering-no-falsy-and**: 삼항 연산자 유지

## 개발 접근

### Phase: 스타일링 (Design 문서의 Phase 2에 해당)
- 색상 시스템 수정 → 컴포넌트별 스타일 개선
- 웹 우선 확인 → 네이티브 확인

## 우선순위
1. Primary 색상 전체 변경 (orange → red)
2. Filter/Understanding 버튼 outline 스타일
3. Header 활성 탭 + 아이콘 개선
4. Breadcrumb 개선
5. 썸네일 duration 뱃지 위치
6. Hover/Focus 상태 추가
