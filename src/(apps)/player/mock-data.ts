export interface Lecture {
  id: string;
  title: string;
  duration: string;
  isActive?: boolean;
}

export interface Bookmark {
  id: string;
  time: string;
  label: string;
}

export interface QnAItem {
  id: string;
  author: string;
  date: string;
  question: string;
  answer?: {
    label: string;
    content: string;
  };
}

export interface CCItem {
  id: string;
  /** 시작 시간 (초) */
  startTime: number;
  /** 종료 시간 (초) */
  endTime: number;
  text: string;
}

export const MOCK_CC_DATA: CCItem[] = [
  { id: "cc1", startTime: 0, endTime: 3.5, text: "안녕하세요 여러분" },
  { id: "cc2", startTime: 3.5, endTime: 7.2, text: "오늘 배울 내용은 명제의 정의입니다" },
  { id: "cc3", startTime: 7.2, endTime: 11.0, text: "명제란 참 또는 거짓을 판별할 수 있는 문장입니다" },
  { id: "cc4", startTime: 11.0, endTime: 15.5, text: "예를 들어 '2는 짝수이다'는 참인 명제입니다" },
  { id: "cc5", startTime: 15.5, endTime: 19.0, text: "'3은 짝수이다'는 거짓인 명제가 되겠죠" },
  { id: "cc6", startTime: 19.0, endTime: 23.5, text: "하지만 '이 꽃은 아름답다'는 명제가 아닙니다" },
  { id: "cc7", startTime: 23.5, endTime: 27.0, text: "왜냐하면 참 거짓을 객관적으로 판별할 수 없기 때문이에요" },
  { id: "cc8", startTime: 27.0, endTime: 31.5, text: "이런 문장을 우리는 '열린 문장'이라고 합니다" },
  { id: "cc9", startTime: 31.5, endTime: 36.0, text: "자 그러면 명제의 부정에 대해 알아볼까요" },
  { id: "cc10", startTime: 36.0, endTime: 40.5, text: "명제 p의 부정은 ~p로 표기합니다" },
  { id: "cc11", startTime: 40.5, endTime: 45.0, text: "p가 참이면 ~p는 거짓이 되고" },
  { id: "cc12", startTime: 45.0, endTime: 49.5, text: "p가 거짓이면 ~p는 참이 됩니다" },
  { id: "cc13", startTime: 49.5, endTime: 54.0, text: "이것을 진리표로 나타내면 더 명확하게 볼 수 있어요" },
  { id: "cc14", startTime: 54.0, endTime: 58.5, text: "다음으로 조건문에 대해 설명하겠습니다" },
  { id: "cc15", startTime: 58.5, endTime: 63.0, text: "조건문은 'p이면 q이다' 형태의 명제입니다" },
  { id: "cc16", startTime: 63.0, endTime: 67.5, text: "이것을 기호로 p → q 라고 씁니다" },
  { id: "cc17", startTime: 67.5, endTime: 72.0, text: "여기서 p를 가정, q를 결론이라고 합니다" },
  { id: "cc18", startTime: 72.0, endTime: 76.5, text: "조건문의 역, 이, 대우에 대해서도 알아야 합니다" },
  { id: "cc19", startTime: 76.5, endTime: 81.0, text: "역은 q → p, 이는 ~p → ~q" },
  { id: "cc20", startTime: 81.0, endTime: 85.0, text: "대우는 ~q → ~p 가 됩니다" },
];

export const MOCK_COURSE = {
  title: "강좌명 : 수학 논리학의 기초",
  currentLecture: "[2강] 명제의 정의",
  description:
    "현대시의 특징, 비유법, 역설 등 EBS 문학 독해의 핵심 개념을 학습합니다. 김소월, 한용운 등 주요 작가의 작품을 분석합니다.",
  progress: 1,
  currentTime: "00:26",
  totalTime: "45:32",
};

export const MOCK_LECTURES: Lecture[] = [
  { id: "1", title: "[1강] 논리학 개요", duration: "12:30" },
  { id: "2", title: "[2강] 명제의 정의", duration: "45:32", isActive: true },
  { id: "3", title: "[3강] 3교시 EBS 문학 독해", duration: "18:42" },
  { id: "4", title: "[4강] 논리 연산자", duration: "14:15" },
  { id: "5", title: "[5강] 진리표 작성법", duration: "19:03" },
  { id: "6", title: "[6강] 추론과 증명", duration: "20:10" },
  { id: "7", title: "[7강] 종합 정리", duration: "11:45" },
];

export const MOCK_BOOKMARKS: Bookmark[] = [
  { id: "1", time: "05:40", label: "명제 정의 핵심" },
  { id: "2", time: "14:50", label: "논리 연산 공식" },
];

export interface SubtitleItem {
  id: string;
  /** 시작 시간 (초) */
  startTime: number;
  /** 표시용 시간 문자열 */
  timeLabel: string;
  text: string;
}

export interface SubtitleSection {
  id: string;
  title: string;
  summary: string;
  subtitles: SubtitleItem[];
}

export const MOCK_SUBTITLE_SECTIONS: SubtitleSection[] = [
  {
    id: "s1",
    title: "동사 HELP의 중요성",
    summary: "동사 HELP의 다양한 용법; 목적격 보어 자리에 to 부정사와 원형 부정사 사용",
    subtitles: [
      { id: "st1", startTime: 354, timeLabel: "00:05:54", text: "뭐뭐 하도록 하게 하다 라는 의미로 쓰여요" },
      { id: "st2", startTime: 363, timeLabel: "00:06:03", text: "의미가 조금씩 달라져요" },
      { id: "st3", startTime: 369, timeLabel: "00:06:09", text: "제가 HELP 옆에다가 별표 처 놓았죠" },
      { id: "st4", startTime: 373, timeLabel: "00:06:13", text: "상위권부터 상위권까지 잘 나오는 동사가 HELP에요" },
      { id: "st5", startTime: 379, timeLabel: "00:06:19", text: "물론 Make, Help, Wrap 에도 잘 나와요" },
      { id: "st6", startTime: 382, timeLabel: "00:06:22", text: "HELP는 어디가 다 달라요" },
      { id: "st7", startTime: 387, timeLabel: "00:06:27", text: "HELP가 오형식으로 쓰이잖아?" },
    ],
  },
  {
    id: "s2",
    title: "목적격 보어의 이해",
    summary: "목적격 보어의 개념 설명; 원형 부정사와 목적격 보어의 관계; 문장의 필수 성분으로서의 역할",
    subtitles: [
      { id: "st8", startTime: 420, timeLabel: "00:07:00", text: "그럼 목적호와 목적격 보호와 잠깐 관계를 따져봤더니 우리가 사람이잖아요." },
      { id: "st9", startTime: 450, timeLabel: "00:07:30", text: "사람이 이해할 수가 있잖아. 그치. 능동이니까 동사 원형을 쓰는 거예요." },
      { id: "st10", startTime: 480, timeLabel: "00:08:00", text: "근데요. 선생님. 질문이 있습니다." },
    ],
  },
  {
    id: "s3",
    title: "수동태와 능동태의 구분",
    summary: "목적격 보어에서 PP와 V-ing 사용 시의 차이; 수동 관계와 능동 관계",
    subtitles: [
      { id: "st11", startTime: 540, timeLabel: "00:09:00", text: "수동태와 능동태를 어떻게 구분하느냐" },
      { id: "st12", startTime: 570, timeLabel: "00:09:30", text: "PP를 쓰는 경우와 V-ing를 쓰는 경우가 다릅니다" },
      { id: "st13", startTime: 600, timeLabel: "00:10:00", text: "수동 관계일 때는 과거분사를 쓰게 됩니다" },
    ],
  },
  {
    id: "s4",
    title: "목적격 보어의 개념",
    summary: "목적격 보어의 정의 및 예시; 아기 이름 짓기 예시를 통한 설명",
    subtitles: [
      { id: "st14", startTime: 660, timeLabel: "00:11:00", text: "목적격 보어라는 건 뭐냐면" },
      { id: "st15", startTime: 690, timeLabel: "00:11:30", text: "아기 이름을 짓는 것처럼 목적어를 보충해주는 거예요" },
    ],
  },
  {
    id: "s5",
    title: "Be 동사와 진행형",
    summary: "Be 동사와 진행형 개념 설명; 자동사와 타동사의 차이; 목적어 유무에 따른 동사 분류",
    subtitles: [
      { id: "st16", startTime: 750, timeLabel: "00:12:30", text: "Be 동사 다음에 -ing가 오면 진행형이 됩니다" },
      { id: "st17", startTime: 780, timeLabel: "00:13:00", text: "자동사와 타동사의 차이는 목적어 유무입니다" },
    ],
  },
  {
    id: "s6",
    title: "지각동사 학습 팁",
    summary: "지각동사 암기의 어려움; 학습 계획 및 준비 방법",
    subtitles: [
      { id: "st18", startTime: 840, timeLabel: "00:14:00", text: "지각동사는 외우기가 좀 어렵습니다" },
      { id: "st19", startTime: 870, timeLabel: "00:14:30", text: "학습 계획을 세워서 준비하면 좋겠죠" },
    ],
  },
];

export const MOCK_QNA: QnAItem[] = [
  {
    id: "1",
    author: "김학생",
    date: "03.02",
    question: "드모르간 법칙에서 NOT이 분배되는 원리가 잘 이해가 안 됩니다.",
    answer: {
      label: "강사 답변",
      content:
        "좋은 질문입니다! 벤 다이어그램으로 시각적으로 이해하면 쉽습니다. 다음 강의에서 추가 설명 드리겠습니다.",
    },
  },
  {
    id: "2",
    author: "박학생",
    date: "03.03",
    question:
      "진리표 작성 시 변수가 3개 이상일 때 효율적으로 작성하는 방법이 있나요?",
  },
];
