import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyInfoApi, studentLoginApi } from "@/api/auth/auth.api";
import { MyInfo, StudentLoginProps } from "@/types/auth/auth.interface";


export const authQueryKeys = {
  STUDENT_LOGIN: "student-login",
  MY_INFO: "my-info",
};

export const useStudentLoginMutation = () => {
  return useMutation({
    mutationKey: [authQueryKeys.STUDENT_LOGIN],
    mutationFn: (props: StudentLoginProps) => studentLoginApi(props),
  });
};

export const useGetMyInfoQuery = (isEnabled = true) => {
  return useQuery<MyInfo>(
    [authQueryKeys.MY_INFO],
    () => getMyInfoApi(),
    {
      enabled: isEnabled,
      staleTime: 0,
      cacheTime: 0,
      refetchOnMount: true,
    }
  );
};