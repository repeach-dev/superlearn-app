# Plan: 페이지 라우팅 (page-routing)

## 개요
Expo Router(파일 기반 라우팅)를 도입하여 Header 탭 네비게이션을 실제 페이지 전환으로 연결한다.
나의 클립만 실제 구현, 나머지 4개는 placeholder 페이지로 구성.

## 현재 상태
- App.tsx에서 MyClipsScreen을 직접 렌더링 (라우팅 없음)
- Header의 탭은 UI만 존재, 클릭 시 아무 동작 없음
- `app/` 디렉토리 미존재 (Expo Router 미설정)

## 라우팅 구조

### URL 매핑

| 탭 | URL | 파일 | 구현 수준 |
|----|-----|------|----------|
| 나의 강의실 | `/classroom` | `app/(tabs)/classroom.tsx` | placeholder |
| 나의 클립 | `/clips` | `app/(tabs)/clips.tsx` | 실제 구현 (MyClipsScreen) |
| 학습 자료실 | `/resources` | `app/(tabs)/resources.tsx` | placeholder |
| 과제 제출 | `/assignments` | `app/(tabs)/assignments.tsx` | placeholder |
| 공지사항 | `/notices` | `app/(tabs)/notices.tsx` | placeholder |

### 파일 구조

```
app/
├── _layout.tsx              # 루트 레이아웃 (Stack)
├── index.tsx                # / → /clips 리다이렉트
└── (tabs)/
    ├── _layout.tsx          # 탭 레이아웃 (Header + 콘텐츠)
    ├── classroom.tsx        # 나의 강의실 (placeholder)
    ├── clips.tsx            # 나의 클립 (MyClipsScreen 연결)
    ├── resources.tsx        # 학습 자료실 (placeholder)
    ├── assignments.tsx      # 과제 제출 (placeholder)
    └── notices.tsx          # 공지사항 (placeholder)
```

### 레이아웃 전략

- **웹**: Header는 상단 가로탭으로 동작 (현재 디자인 유지)
  - Expo Router의 Tabs 대신 **커스텀 Header**를 유지 (디자인이 네이티브 탭바와 다름)
  - `(tabs)/_layout.tsx`에서 `headerShown: false` + 커스텀 Header + Slot
- **네이티브**: 추후 Bottom Tab 또는 Drawer로 전환 가능

## 주요 변경사항

### 1. 패키지 설치
- `expo-router` (Expo SDK 54에 내장)
- `expo-linking`, `expo-constants` (라우터 의존성)
- `react-native-safe-area-context`, `react-native-screens`

### 2. 설정 변경
- `package.json`: `"main"` → `"expo-router/entry"`
- `app.json` 또는 `app.config.js`: `scheme` 추가

### 3. Header 수정
- `Header.web.tsx`: 현재 페이지 감지 (usePathname), 탭 클릭 시 router.push
- Breadcrumb: 현재 경로 기반 동적 렌더링

### 4. 기존 코드 이동
- `src/screens/MyClipsScreen.tsx` → 그대로 유지, `app/(tabs)/clips.tsx`에서 import

## vercel-react-native-skills 적용
- **navigation-native-navigators**: Expo Router는 기본적으로 native-stack 사용 (OK)
- 웹에서는 커스텀 Header를 유지하되, 네이티브에서는 native header options 활용 가능

## web-design-guidelines 적용
- **URL reflects state**: 탭 전환이 URL에 반영됨 (/clips, /classroom 등)
- **Links use `<a>`/`<Link>`**: Header 탭을 Expo Router Link로 변경
- **Deep-link all stateful UI**: 각 탭이 고유 URL을 가짐

## 우선순위
1. Expo Router 설정 + app/ 구조 생성
2. (tabs)/_layout.tsx에 Header 연결
3. Header.web.tsx에 라우팅 연결 (Link/usePathname)
4. Placeholder 페이지 4개 생성
5. 기존 MyClipsScreen 연결 확인
6. Breadcrumb 동적 경로 표시
