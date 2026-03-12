# Plan: 모바일 반응형 + 바텀 네비게이션 (mobile-nav)

## 개요
모바일에서 바텀 네비게이션 바를 추가하고, 레이아웃을 모바일 화면에 최적화한다.
웹에서는 기존 상단 Header 탭 유지, 네이티브에서는 바텀 탭으로 전환.

## 현재 상태 (스크린샷 분석)

### 잘 동작하는 부분
- 타이틀/설명 텍스트 정상
- 통계 카드 4개 가로 배치 OK
- 클립 아이템 레이아웃 정상 (썸네일 + 정보)
- 이해도 버튼 정상

### 문제점
1. **네비게이션 없음**: 네이티브에서 페이지 간 이동 불가 (Header.native.tsx가 로고만 표시)
2. **필터 영역 잘림**: 필터 탭 + 정렬 + 전체재생이 한 줄에 못 들어감
3. **PlayAllButton 화면 밖**: 가로 공간 부족으로 전체 재생 버튼 안보임

## 변경 계획

### 1. 탭 레이아웃 분리 (웹 vs 네이티브)

| 플랫폼 | 네비게이션 | 구현 |
|--------|-----------|------|
| Web | 상단 커스텀 Header (현재 유지) | `(tabs)/_layout.tsx` → Slot + Header |
| Native | 바텀 탭 바 | Expo Router Tabs 사용 |

### 2. `(tabs)/_layout.tsx` 플랫폼 분기

```
app/(tabs)/
├── _layout.web.tsx       # 웹: 커스텀 Header + Slot (현재 유지)
├── _layout.native.tsx    # 네이티브: Expo Router Tabs (바텀 탭)
```

### 3. 바텀 탭 구성 (네이티브)

| 탭 | 아이콘 | 라벨 |
|----|--------|------|
| 나의 강의실 | 📚 | 강의실 |
| 나의 클립 | 🎬 | 클립 |
| 학습 자료실 | 📁 | 자료실 |
| 과제 제출 | 📝 | 과제 |
| 공지사항 | 📢 | 공지 |

### 4. 모바일 레이아웃 수정

#### 필터 영역 (FilterTabs + Sort + PlayAll)
- 모바일: 2줄로 분리
  - 1줄: 필터 탭 (수평 스크롤)
  - 2줄: 정렬 + 전체 재생
- 웹: 현재 1줄 유지

#### Header.native.tsx
- 바텀 탭이 있으므로 네이티브 Header 제거 또는 최소화
- screenOptions에서 headerShown: false 또는 타이틀만

### 5. vercel-react-native-skills 적용
- **navigation-native-navigators**: Expo Router의 네이티브 탭 사용
- **ui-safe-area-scroll**: SafeArea 적용

## 수정 대상 파일

| # | 파일 | 변경 |
|---|------|------|
| 1 | `app/(tabs)/_layout.tsx` → `.web.tsx` | 기존 코드를 웹 전용으로 분리 |
| 2 | `app/(tabs)/_layout.native.tsx` | 신규: 바텀 탭 네비게이션 |
| 3 | `src/screens/MyClipsScreen.tsx` | 필터 영역 모바일 반응형 |
| 4 | `src/components/layout/Header.native.tsx` | 불필요시 제거 |

## 우선순위
1. _layout 플랫폼 분리 (web/native)
2. 바텀 탭 네비게이션 구현
3. 필터 영역 모바일 반응형
