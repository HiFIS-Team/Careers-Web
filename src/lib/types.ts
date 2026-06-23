// 채용 공고 도메인 타입 정의

export type EmploymentType = "정규직" | "계약직" | "인턴" | "파트타임";

/** 지원 시 제출 서류 항목 */
export interface ApplyDocument {
  name: string;
  required: boolean;
  note?: string;
}

/** 지원 시 동의 항목 */
export interface ApplyTerm {
  id: string;
  title: string;
  required: boolean;
}

export type CareerType = "신입" | "경력" | "경력무관";

/** 직군 — 공고를 묶는 큰 단위 (필터/직군 소개 섹션과 매칭) */
export type JobGroupKey = "office" | "field" | "coach";

export interface Opening {
  /** URL/식별용 슬러그 */
  id: string;
  /** 공고 제목 */
  title: string;
  /** 직군 */
  group: JobGroupKey;
  /** 세부 직무 (예: 브랜드 디자이너) */
  job: string;
  /** 근무지 (짧은 표기, 예: 서울 본사) */
  location: string;
  /** 지도용 실제 주소 (필수) */
  address: string;
  employment: EmploymentType;
  career: CareerType;
  /** 급여 (여러 줄, 선택) */
  salary?: string[];
  /** 근무 시간 (여러 줄, 선택) */
  workHours?: string[];
  /** 카드에 노출되는 한 줄 요약 */
  summary: string;
  /** 상단 강조(🔥) 여부 */
  hot?: boolean;
  /** 지원 링크 (외부 폼/메일). 비우면 기본 채용 메일로 연결 */
  applyUrl?: string;

  // ---- 상세 페이지 콘텐츠 (선택) ----
  /** 포지션 소개 문단 */
  description?: string;
  /** 포지션의 매력 */
  appeal?: string[];
  /** 주요 업무 */
  responsibilities?: string[];
  /** 자격 요건 */
  qualifications?: string[];
  /** 우대 사항 */
  preferred?: string[];
}
