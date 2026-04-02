import defaultClient, { postGraphql } from "../default-client";
import { StudentContentResponse, StudentPurchaseInfoResponse, SubtitleResponse, SummaryResponse } from "@/types/student-classroom/student-classroom.interface";

export const getStudentPurchaseInfoApi = async (): Promise<StudentPurchaseInfoResponse> => {
  const query = `
    query studentPurchaseInfo {
      studentPurchaseInfo {
        productBuyerId
        product {
          _id
          name
          package {
            _id
            courses {
              _id
              status
              name
              courseContents {
                content {
                  _id
                  histories {
                    _id
                    progress
                    updatedAt
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const { data } = await postGraphql({ query });
  return data;
};

export const getStudentContentApi = async (contentId: string|null): Promise<StudentContentResponse> => {
  if(!contentId) throw new Error("contentId is required");
  const query = `
    query myPurchasedContent {
      myPurchasedContent(id:"${contentId}") {
        _id
        video {
          _id
          videoHash
          videoInfo
        }
      }
    }
  `
  const { data } = await postGraphql({ query });
  return data;
}

export const subtitleBycontentIdApi = async (contentId: string|null): Promise<SubtitleResponse> => {
    if(!contentId) throw new Error("contentId is required");
    const url = `/student-classroom/subtitles/${contentId}/vtt?language=ko`;
    const response = await defaultClient.get<SubtitleResponse>(url);

  return response.data;
}

export const summaryByContentIdApi = async (contentId: string|null): Promise<SummaryResponse> => {
  if(!contentId) throw new Error("contentId is required");
  const query = `
    query summaryByContentId {
      summaryByContentId(contentId: "${contentId}") {
        text
        title
        description
        start
        end
      }
    }
  `;
  const { data } = await postGraphql({ query });
  return data;
}