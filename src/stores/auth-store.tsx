import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthStoreState {
  accessToken: string | null;
  user: User | null;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  savedId: string;
  setSavedId: (savedId: string) => void;
  saveId: boolean;
  setSaveId: (saveId: boolean) => void;
}

const initialState: Pick<AuthStoreState, "accessToken" | "user" | "savedId" | "saveId"> = {
  accessToken: null,
  user: null,
  savedId: "",
  saveId: false,
};

// 만약 JSON 직렬화/역직렬화를 커스텀 쿠키 스토리지에서도 재사용하고 싶다면:
const createCookieStorage = (cookieDomain: string) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    // During SSR we fallback to an in-memory store so the module can be imported safely.
    const memoryStorage = new Map<string, string | null>();
    return {
      getItem: (name: string) => memoryStorage.get(name) ?? null,
      setItem: (name: string, value: any) => {
        memoryStorage.set(name, typeof value === "string" ? value : String(value));
      },
      removeItem: (name: string) => {
        memoryStorage.delete(name);
      },
    };
  }

  const hostname = window.location.hostname;
    // const isLocal = window.location.hostname === "localhost";
  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("172.");
  let appliedDomain = cookieDomain;

  if (!isLocal && !window.location.host.includes("superlearn.kr")) {
    // leadwin.repeach.kr (개발서버) 인 경우에는 사파리 팝업(플레이어)과 
    // 쿠키를 공유하기 위해 메인 도메인을 .repeach.kr 로 명시적으로 박아둡니다.
    if (window.location.host.includes("leadwin.repeach.kr")) {
      appliedDomain = ".repeach.kr";
    } else {
      // 그 외의 경우 기존 로직 유지 (서브도메인 공유가 아닐 경우의 처리)
      appliedDomain = `.${window.location.host}`;
    }
  }

  return {
    getItem: (name: string) => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const prefix = `${name}=`;
      const foundCookie = cookies.find((cookie) => cookie.startsWith(prefix));
      if (!foundCookie) return null;
      try {
        return JSON.parse(decodeURIComponent(foundCookie.substring(prefix.length)));
      } catch (err) {
        return null;
      }
    },
    setItem: (name: string, value: any) => {
      // value는 stringified JSON 상태 객체입니다.
      // 로그아웃 등으로 accessToken이 null이 되면 쿠키를 삭제합니다.
      try {
        const parsed = JSON.parse(value);
        // Zustand persist는 { state: { ... }, version: 0 } 형태로 저장합니다.
        if (parsed.state && parsed.state.accessToken === null) {
          console.log('Clearing auth cookie because accessToken is null');
          document.cookie = [
            `${name}=`,
            !isLocal ? `domain=${appliedDomain}` : "", // 로컬이면 도메인 생략
            "path=/",
            "expires=Thu, 01 Jan 1970 00:00:01 GMT",
            !isLocal ? "SameSite=None" : "SameSite=Lax",
            !isLocal ? "Secure" : "",
          ].filter(Boolean).join("; ");
          return;
        }
      } catch (e) {
        // parsing error, ignore
      }

      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      const rawValue = encodeURIComponent(JSON.stringify(value));

      document.cookie = [
        `${name}=${rawValue}`,
        !isLocal ? `domain=${appliedDomain}` : "", // 로컬이면 도메인 생략
        "path=/",
        `expires=${expires.toUTCString()}`,
        !isLocal ? "SameSite=None" : "SameSite=Lax",
        !isLocal ? "Secure" : "", // HTTPS 환경 필수
      ].filter(Boolean).join("; ");
    },
    removeItem: (name: string) => {
      console.log('removing cookie', appliedDomain, name);
      document.cookie = [
        `${name}=`,
        !isLocal ? `domain=${appliedDomain}` : "", // 로컬이면 도메인 생략
        "path=/",
        "expires=Thu, 01 Jan 1970 00:00:01 GMT",
        !isLocal ? "SameSite=None" : "SameSite=Lax",
        !isLocal ? "Secure" : "",
      ].filter(Boolean).join("; ");
    },
  };
};

// persist에 사용될 부분만 추려서 저장(전체 state 중 꼭 필요한 것만)
const partialize = (state: AuthStoreState) => ({
  accessToken: state.accessToken,
  savedId: state.savedId,
});

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      setAccessToken: (accessToken) => set({ accessToken }),
      setUser: (user) => set({ user }),
      logout: () => set({ accessToken: null, user: null }),
      setSavedId: (savedId) => set({ savedId }),
      setSaveId: (saveId) => set({ saveId }),
    }),
    {
      name: "auth-storage",
      // createJSONStorage를 쓰지 않고 직접 custom storage를 리턴해도 무방
      version: 0,
      migrate: (persistedState: any, version: number) => {
        // 유저의 브라우저 저장소 버전(0)이 현재 소스의 버전(1)과 다르면 무조건 이 함수를 탑니다.
        console.log(`auth store 구형 데이터 발견 (버전 ${version}). 안전하게 초기화합니다.`);

        // 복잡한 변환 없이 무조건 제일 깨끗한 초기 상태값을 던져서 덮어씌워버립니다.
        return initialState as AuthStoreState;
      },
      storage: createJSONStorage(() =>
        createCookieStorage("https://leadwin.repeach.kr")
      ),
      partialize,
    }
  )
);
