# Plan: 나의 클립 (My Clips)

## 개요
강의에서 이해 안 되는 부분을 클립으로 저장하고, 모아서 재생/복습할 수 있는 페이지.

## 이미지 분석 (UI 구성요소)

### 1. 상단 네비게이션 (Header)
- **로고**: Super Learn
- **메인 탭**: 나의 강의실 | **나의 클립** | 학습 자료실 | 과제 제출 | 공지사항
- **우측 아이콘**: 다크모드 토글, 알림(뱃지), 설정, 프로필, 로그아웃

### 2. 브레드크럼
- 나의 강의실 > 나의 클립

### 3. 페이지 타이틀 영역
- 제목: "나의 클립"
- 설명: "강의에서 이해 안되는 부분을 모아 따로 재생하고 복습하세요."

### 4. 통계 카드 (4개)
| 카드 | 값 | 설명 |
|------|-----|------|
| 전체 클립 | 5 | 전체 수 |
| 완전 이해 | 2 | 녹색 |
| 보통 | 1 | - |
| 이해 안됨 | 1 | 빨간색 |

### 5. 필터 & 정렬
- **필터 탭**: 전체 (활성/주황) | 이해 안됨 | 보통 | 완전 이해
- **정렬**: 최신순 드롭다운
- **전체 재생 버튼**: 빨간색 ▶

### 6. 클립 목록 (리스트)
각 클립 아이템:
- 썸네일 이미지 (좌측, 재생시간 뱃지)
- 클립 제목 (예: "김소월 진달래꽃 분석")
- 출처 정보 (예: "[2강] EBS 문학 독해 · 35:00 ~ 40:15")
- 이해도 버튼: 미확인 | 이해 안됨 | 보통 | 완전 이해
- 등록일 (우측)

## 페이지 & 컴포넌트 명명 규칙

### 페이지 (Screens)
| 페이지 | 파일명 | 경로 |
|--------|--------|------|
| 나의 클립 | `MyClipsScreen` | `src/screens/MyClipsScreen.tsx` |

### 컴포넌트 (Components)
| 컴포넌트 | 파일명 | 역할 |
|----------|--------|------|
| 헤더/네비 | `Header` | `src/components/layout/Header.tsx` |
| 브레드크럼 | `Breadcrumb` | `src/components/layout/Breadcrumb.tsx` |
| 통계 카드 | `StatsCard` | `src/components/clips/StatsCard.tsx` |
| 통계 카드 그룹 | `StatsCardGroup` | `src/components/clips/StatsCardGroup.tsx` |
| 필터 탭 | `FilterTabs` | `src/components/clips/FilterTabs.tsx` |
| 정렬 드롭다운 | `SortDropdown` | `src/components/clips/SortDropdown.tsx` |
| 전체 재생 버튼 | `PlayAllButton` | `src/components/clips/PlayAllButton.tsx` |
| 클립 아이템 | `ClipItem` | `src/components/clips/ClipItem.tsx` |
| 클립 리스트 | `ClipList` | `src/components/clips/ClipList.tsx` |
| 이해도 버튼 그룹 | `UnderstandingLevel` | `src/components/clips/UnderstandingLevel.tsx` |

## 개발 접근 방식

### Phase 1: 스케치 (현재)
- 버튼과 레이아웃만 배치한 와이어프레임 수준
- 데이터는 하드코딩 (mock data)
- **웹 우선 개발** → 앱(Native) 동작 확인

### Phase 2: 스타일링
- NativeWind(Tailwind) 기반 디자인 적용
- 이미지 디자인에 맞춘 색상/간격 조정

### Phase 3: 기능 연동
- API 연동, 상태관리
- 필터/정렬 동작
- 클립 재생 기능

## 플랫폼 분리 규칙
- Web과 Native 동작이 다른 컴포넌트는 `.web.tsx` / `.native.tsx`로 분리
- 예: Header (웹은 가로탭, 앱은 다르게 구성 가능)

## 우선순위
1. MyClipsScreen 스케치 (버튼 배치)
2. 웹에서 확인
3. 앱(iOS/Android)에서 확인
