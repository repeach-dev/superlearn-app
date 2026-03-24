import defaultClient from "../default-client";
import { StudentLoginProps, StudentLoginResult } from "@/types/auth/auth.interface";


export const studentLoginApi = async (props: StudentLoginProps): Promise<StudentLoginResult> => {
  const response = await defaultClient.post<StudentLoginResult>(`/auth/student-login`, {
    email: props.email,
    password: props.password,
  });

  return response.data;
};


// graphQL
