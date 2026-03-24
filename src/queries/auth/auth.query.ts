import { useMutation } from "@tanstack/react-query";
import { studentLoginApi } from "@/api/auth/auth.api";
import { StudentLoginProps } from "@/types/auth/auth.interface";


export const authQueryKeys = {
  STUDENT_LOGIN: "student-login",
};

export const useStudentLoginMutation = () => {
  return useMutation({
    mutationKey: [authQueryKeys.STUDENT_LOGIN],
    mutationFn: (props: StudentLoginProps) => studentLoginApi(props),
  });
};
