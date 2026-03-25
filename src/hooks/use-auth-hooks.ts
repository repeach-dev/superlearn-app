import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { useMyStore } from "@/stores/my.store";
import DefaultClient from "@/api/default-client";
import { useRouter } from "expo-router";

export const useAuthHooks = () => {

  /**
   * 로그아웃
   */
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  // const { resetMyInfo } = useMyStore();
  const router = useRouter();
  const authLogout = () => {
    queryClient.clear();
    delete DefaultClient.defaults.headers.common["Authorization"];
    // resetMyInfo();
    logout();
    // resetMyInfo();
    router.push("/");
  }


  return { authLogout }
}