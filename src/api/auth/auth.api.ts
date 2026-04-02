import defaultClient, { postGraphql } from "../default-client";
import { StudentLoginProps, StudentLoginResult } from "@/types/auth/auth.interface";

// 로그인
export const studentLoginApi = async (props: StudentLoginProps): Promise<StudentLoginResult> => {
  const response = await defaultClient.post<StudentLoginResult>(`/auth/student-login`, {
    email: props.email,
    password: props.password,
  });

  return response.data;
};

// 학생 정보 조회
export const getMyInfoApi = async () => {
  const query = `
        query my {
            my {
                _id
                name
                email
                phoneNumber
                subNumber
                address
                addressDetail
                zoneCode
            }
        }
    `;
  const { data } = await postGraphql({ query });
  return data;
};


// graphQL
