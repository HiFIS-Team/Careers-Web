import type { Opening } from "@/lib/types";

/**
 * 채용 공고 목록.
 * 공고를 추가/삭제하려면 이 배열만 수정하면 됩니다.
 * group 값은 site.ts의 jobGroups 키(office/field/coach)와 매칭됩니다.
 * description/responsibilities/qualifications/preferred 는 상세 페이지에 표시됩니다.
 */
export const openings: Opening[] = [
  {
    id: "brand-designer",
    title: "브랜드 디자이너 (BX)",
    group: "office",
    job: "디자인",
    location: "서울 본사",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "경력",
    summary: "피트니스스타의 브랜드 경험을 시각 언어로 설계합니다.",
    hot: true,
    description:
      "피트니스스타의 브랜드 아이덴티티를 시각적으로 정의하고, 온·오프라인 전반의 브랜드 경험을 일관되게 설계하는 역할입니다.",
    appeal: [
      "빠르게 성장하는 브랜드의 비주얼 방향성을 주도할 수 있습니다.",
      "온·오프라인을 넘나드는 다양한 디자인을 경험합니다.",
    ],
    responsibilities: [
      "브랜드 아이덴티티 및 비주얼 가이드라인 수립",
      "지점/캠페인/디지털 채널의 디자인 제작",
      "브랜드 톤앤매너 유지 및 발전",
    ],
    qualifications: [
      "브랜드/그래픽 디자인 3년 이상 경력",
      "포트폴리오 제출 가능자",
      "Figma 등 디자인 툴 능숙",
    ],
    preferred: ["피트니스/라이프스타일 브랜드 경험", "모션 그래픽 역량"],
  },
  {
    id: "marketing-pm",
    title: "퍼포먼스 마케터",
    group: "office",
    job: "마케팅",
    location: "서울 본사",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "경력",
    summary: "데이터 기반으로 신규 회원 유입과 브랜드 성장을 이끕니다.",
    hot: true,
    description:
      "데이터를 기반으로 광고/콘텐츠/CRM 전반의 마케팅을 설계하고 실행하여 신규 회원 유입과 매출 성장을 만듭니다.",
    appeal: [
      "예산과 채널을 주도적으로 운영하며 성과를 직접 만듭니다.",
      "실험과 학습이 빠르게 반복되는 환경에서 성장합니다.",
    ],
    responsibilities: [
      "퍼포먼스 광고 기획·운영·최적화",
      "마케팅 데이터 분석 및 성과 리포트",
      "신규 유입 채널 발굴 및 실험",
    ],
    qualifications: [
      "디지털 마케팅 3년 이상 경력",
      "GA 등 데이터 분석 도구 활용 가능",
      "숫자로 의사결정하는 분",
    ],
    preferred: ["오프라인 매장/멤버십 비즈니스 경험", "CRM 마케팅 경험"],
  },
  {
    id: "service-planner",
    title: "서비스 기획자 (PM)",
    group: "office",
    job: "기획",
    location: "서울 본사",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "경력무관",
    summary: "회원 경험을 처음부터 끝까지 설계하고 개선합니다.",
    description:
      "회원이 만나는 서비스 전 과정을 기획하고, 현장과 데이터를 오가며 더 나은 경험으로 개선하는 역할입니다.",
    appeal: [
      "서비스의 시작부터 끝까지 직접 설계할 수 있습니다.",
      "현장과 데이터를 함께 보며 임팩트를 만듭니다.",
    ],
    responsibilities: [
      "서비스/제품 기획 및 요구사항 정의",
      "유관 부서 협업 및 일정 관리",
      "출시 후 데이터 기반 개선",
    ],
    qualifications: [
      "문제를 구조화하고 정의하는 능력",
      "원활한 커뮤니케이션 역량",
    ],
    preferred: ["오프라인 서비스 기획 경험", "데이터 분석 역량"],
  },
  {
    id: "hr-manager",
    title: "인사 담당자 (HR)",
    group: "office",
    job: "경영지원",
    location: "서울 본사",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "신입",
    summary: "최고의 팀을 만드는 채용과 조직문화를 담당합니다.",
    description:
      "채용부터 온보딩, 조직문화까지 사람과 관련된 모든 일을 함께 만들어가는 역할입니다.",
    appeal: [
      "최고의 팀을 만드는 일에 처음부터 기여할 수 있습니다.",
      "다양한 HR 업무를 폭넓게 경험하며 성장합니다.",
    ],
    responsibilities: [
      "채용 프로세스 운영 및 지원",
      "온보딩 및 조직문화 프로그램 운영",
      "인사 데이터/문서 관리",
    ],
    qualifications: ["꼼꼼함과 책임감", "사람에 대한 진심 어린 관심"],
    preferred: ["HR 인턴/관련 경험", "엑셀/노션 활용 능숙"],
  },
  {
    id: "center-manager",
    title: "센터 매니저",
    group: "field",
    job: "운영",
    location: "서울 전지점",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "경력무관",
    summary: "현장 회원 경험과 지점 성과를 직접 만들어냅니다.",
    hot: true,
    description:
      "지점의 운영 전반을 책임지며, 현장에서 회원 경험과 사업 성과를 직접 만들어내고 빠르게 성장합니다.",
    appeal: [
      "한 지점의 운영을 주도하며 성과를 직접 만듭니다.",
      "권역 관리자로 빠르게 성장할 수 있습니다.",
    ],
    responsibilities: [
      "지점 운영 및 회원 응대 총괄",
      "매출/회원 지표 관리",
      "현장 팀 관리 및 운영 개선",
    ],
    qualifications: ["고객 응대를 즐기는 분", "책임감 있는 운영 마인드"],
    preferred: ["매장/지점 운영 경험", "피트니스 산업 이해"],
  },
  {
    id: "space-developer",
    title: "공간개발 매니저",
    group: "field",
    job: "공간개발",
    location: "서울 본사",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "경력",
    summary: "새로운 지점을 발굴하고 최고의 운동 공간을 만듭니다.",
    description:
      "신규 지점 입지를 발굴하고 공간 기획부터 오픈까지 전 과정을 주도하는 역할입니다.",
    appeal: [
      "새로운 공간이 만들어지는 전 과정을 경험합니다.",
      "브랜드의 오프라인 확장을 최전선에서 이끕니다.",
    ],
    responsibilities: [
      "신규 출점 입지 분석 및 발굴",
      "공간 기획 및 시공 관리",
      "오픈 일정/예산 관리",
    ],
    qualifications: ["부동산/공간개발 관련 경력", "프로젝트 관리 역량"],
    preferred: ["리테일/F&B 출점 경험", "건축/인테리어 이해"],
  },
  {
    id: "coach",
    title: "피트니스 코치",
    group: "coach",
    job: "코칭",
    location: "서울 전지점",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "정규직",
    career: "경력무관",
    summary: "수업으로 회원의 몸과 마음의 건강에 직접 기여합니다.",
    hot: true,
    description:
      "그룹 트레이닝 수업을 통해 회원의 건강과 성취감에 직접 기여하고, 헤드코치로 성장할 수 있습니다.",
    appeal: [
      "회원의 변화에 직접 기여하는 보람을 느낍니다.",
      "헤드코치·지점총괄로 빠르게 성장할 수 있습니다.",
    ],
    responsibilities: [
      "그룹 트레이닝 수업 진행",
      "회원 운동 관리 및 동기 부여",
      "커뮤니티 운영 참여",
    ],
    qualifications: ["운동을 사랑하는 분", "밝고 긍정적인 에너지"],
    preferred: ["생활스포츠지도사 등 관련 자격", "지도/강의 경험"],
  },
  {
    id: "part-crew",
    title: "지점 크루 (파트타임)",
    group: "coach",
    job: "운영",
    location: "서울 전지점",
    address: "서울특별시 강남구 테헤란로 123",
    employment: "파트타임",
    career: "신입",
    summary: "현장에서 회원을 가장 가까이서 응대하는 첫 얼굴입니다.",
    description:
      "지점 현장에서 회원을 맞이하고 응대하는, 브랜드의 첫인상을 만드는 역할입니다.",
    appeal: [
      "유연한 시간으로 현장 경험을 쌓을 수 있습니다.",
      "정규직 전환의 기회가 열려 있습니다.",
    ],
    responsibilities: ["회원 응대 및 안내", "지점 환경 관리", "간단한 운영 지원"],
    qualifications: ["친절한 응대 태도", "성실함"],
    preferred: ["서비스/응대 경험", "주말 근무 가능자"],
  },
];

/** id로 공고 1건 찾기 (상세 페이지용) */
export function getOpening(id: string): Opening | undefined {
  return openings.find((o) => o.id === id);
}
