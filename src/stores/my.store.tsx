import { MyData } from "@/types/my/my.interface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface MyStoreState {
    my: MyData | null;
    setMy: (my: MyData) => void;
    getMyInfo: () => MyData | null;
    resetMyInfo: () => void;
}

const initialState = {
    my: null,
}

// 세션 스토리지에 사용될 부분만 추려서 저장
const partialize = (state: MyStoreState) => ({
    my: state.my,
});

export const useMyStore = create<MyStoreState>()(
    persist(
        (set, get) => ({
            ...initialState,
            setMy: (my: MyData) => set({ my }),
            getMyInfo: () => get().my,
            resetMyInfo: () => set({ my: null }),
        }),
        {
            name: "my-storage",
            version: 1, // 기존에 설정이 없었으므로 유저들 브라우저엔 0으로 저장되어 있습니다.
            migrate: (persistedState: any, version: number) => {
                // 유저의 브라우저 저장소 버전(0)이 현재 소스의 버전(1)과 다르면 무조건 이 함수를 탑니다.
                console.log(`MyStore 구형 데이터 발견 (버전 ${version}). 안전하게 초기화합니다.`);

                // 복잡한 변환 없이 무조건 제일 깨끗한 초기 상태값을 던져서 덮어씌워버립니다.
                return initialState as MyStoreState;
            },
            storage: createJSONStorage(() => sessionStorage),
            partialize,
        }
    )
);