import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";
import { hasGraphQLError } from "@/hooks/use-graphql-hooks";


const baseURL: string = `/api/v1`;

const DefaultClient = axios.create({
  baseURL,
  withCredentials: true,
});

DefaultClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

DefaultClient.interceptors.response.use(
  (response) => {
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   response.headers.Authorization = `Bearer ${ token }`;
    // }
    if (hasGraphQLError(response)) {
      if (response.data.errors[0].extensions.code === "UNAUTHENTICATED") {
        // 401 에러(인증 만료) 시 전역 스토어 상태 초기화
        useAuthStore.getState().logout();

        // 만료 후 마이스토어 리셋
        // useMyStore.getState().resetMyInfo();
      }
      return Promise.reject(response);
    }


    return response;
  },
  (error) => {
    if (!error.response?.status) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      // 401 에러(인증 만료) 시 전역 스토어 상태 초기화
      useAuthStore.getState().logout();

      // 만료 후 마이스토어 리셋
      // useMyStore.getState().resetMyInfo();
    }
    return Promise.reject(error);
  }
);

export default DefaultClient;

export const postGraphql = async (body: { query: string; variables?: any }) => {
  return await DefaultClient.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/graphql`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
