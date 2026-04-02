import { useQuery } from "@tanstack/react-query";
import {
  getStudentPurchaseInfoApi,
  getStudentContentApi,
  subtitleBycontentIdApi,
  summaryByContentIdApi,
} from "@/api/student-classroom/student-classroom.api";
import {
  StudentPurchaseInfoResponse,
  StudentContentResponse,
  SubtitleResponse,
  SummaryResponse,
} from "@/types/student-classroom/student-classroom.interface";

export const studentClassroomQueryKeys = {
  STUDENT_PURCHASE_INFO: "student-purchase-info",
  STUDENT_CONTENT: "student-content",
  SUBTITLE: "subtitle",
  SUMMARY: "summary",
};

export const useGetStudentPurchaseInfoQuery = () => {
  return useQuery<StudentPurchaseInfoResponse>({
    queryKey: [studentClassroomQueryKeys.STUDENT_PURCHASE_INFO],
    queryFn: () => getStudentPurchaseInfoApi(),
  });
};

/** 1순위: 영상 정보 (videoHash 포함) */
export const useGetStudentContentQuery = (contentId: string | null) => {
  return useQuery<StudentContentResponse>({
    queryKey: [studentClassroomQueryKeys.STUDENT_CONTENT, contentId],
    queryFn: () => getStudentContentApi(contentId),
    enabled: !!contentId,
  });
};

/** 2순위: 자막 정보 (vtt 파일 — 플레이어 내부에서 사용) */
export const useGetSubtitleQuery = (contentId: string | null) => {
  return useQuery<SubtitleResponse>({
    queryKey: [studentClassroomQueryKeys.SUBTITLE, contentId],
    queryFn: () => subtitleBycontentIdApi(contentId),
    enabled: !!contentId,
  });
};

/** 3순위: 요약 정보 (추후 통합 API로 대체 가능) */
export const useGetSummaryQuery = (contentId: string | null) => {
  return useQuery<SummaryResponse>({
    queryKey: [studentClassroomQueryKeys.SUMMARY, contentId],
    queryFn: () => summaryByContentIdApi(contentId),
    enabled: !!contentId,
  });
};
