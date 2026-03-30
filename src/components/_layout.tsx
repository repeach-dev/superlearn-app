import { useEffect } from "react";
import { MainPageProviders } from "@/api/Providers";
import { useAuthStore } from "@/stores/auth-store";
import { useMyStore } from "@/stores/my.store";
import { useGetMyInfoQuery } from "@/queries/auth/auth.query";

function AuthSync() {
  const { accessToken } = useAuthStore();
  const { setMy } = useMyStore();
  const { data: myInfo, isSuccess } = useGetMyInfoQuery(!!accessToken);

  useEffect(() => {
    if (isSuccess && myInfo?.data?.my) {
      setMy(myInfo.data.my);
    }
  }, [isSuccess, myInfo]);

  return null;
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainPageProviders>
           <AuthSync />
           {children}
        </MainPageProviders>
    )
}