export interface ContentHistory {
  _id: string;
  progress: number;
  updatedAt: string;
}

export interface Content {
  _id: string;
  histories: ContentHistory[];
}

export interface CourseContent {
  content: Content;
}

export interface Course {
  _id: string;
  status: string;
  name: string;
  courseContents: CourseContent[];
}

export interface Package {
  _id: string;
  courses: Course[];
}

export interface Product {
  _id: string;
  name: string;
  package: Package;
}

export interface StudentPurchaseInfo {
  productBuyerId: string;
  product: Product;
}

export interface StudentPurchaseInfoResponse {
  data: {
    studentPurchaseInfo: StudentPurchaseInfo[];
  };
}

export interface Video {
  _id: string;
  videoHash: string;
  videoInfo: JSON;
}

export interface StudentContent {
  _id: string;
  video: Video;
}

export interface StudentContentResponse {
  data: {
    myPurchasedContent: StudentContent;
  };
}

export interface Subtitle {
  _id: string;
  start: number;
  end: number;
  text: string;
}

export interface SubtitleResponse {
  data: {
    subtitleBycontentId: Subtitle[];
  };
}

export interface Summary {
  text: string;
  title: string;
  description: string;
  start: number;
  end: number;
}

export interface SummaryResponse {
  data: {
    summaryByContentId: Summary[];
  };
}
