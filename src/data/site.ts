import type { JobGroupKey } from "@/lib/types";

/**
 * 사이트 전체 문구/콘텐츠.
 * 사진은 image 필드에 "/images/파일명.jpg" 형태로 넣으면 됩니다.
 * 비워두면(""), 자동으로 플레이스홀더가 표시됩니다.
 */

export const site = {
  brand: {
    name: "피트니스스타",
    nameEn: "FITNESS STAR",
    /** 채용 문의 메일 */
    email: "wnstmd1245@naver.com",
    /**
     * 카카오톡 채널 1:1 채팅 URL (예: https://pf.kakao.com/_xxxxx/chat)
     * 비우면 문의 버튼이 이메일로 연결됩니다.
     */
    kakaoChannelUrl: "",
    /** 헤더/푸터 로고 (어두운 배경용 흰색 로고, 투명 배경). 비우면 텍스트 로고 */
    logo: "/images/logo-white.png",
  },

  /** 지점 목록 (공고 필터의 '지점'에 사용). 공고의 근무지와 이름이 같으면 매칭됩니다. */
  branches: ["화순점", "첨단점", "동광주점"],

  nav: [
    { label: "브랜드", href: "/#brands" },
    { label: "조직문화", href: "/#culture" },
    { label: "직군 소개", href: "/#groups" },
    { label: "채용 공고", href: "/#openings" },
  ],

  hero: {
    badge: "2026 핵심 인재 채용",
    title: ["운동의 가치를 전하는", "팀에 합류하세요"],
    subtitle: "피트니스스타는 대한민국 피트니스 시장을 혁신하는 브랜드입니다.",
    primaryCta: { label: "채용 공고 보기", href: "#openings" },
    secondaryCta: { label: "브랜드 알아보기", href: "#brands" },
    /**
     * 배경 슬라이드쇼 이미지들 (자동 전환).
     * 빈 문자열("")은 그라데이션 placeholder로 표시됩니다.
     * 실제 사진을 넣으려면 "/images/hero-1.jpg" 처럼 경로를 적으세요.
     */
    images: ["", "", ""] as string[],
    /** 슬라이드 전환 간격(ms) */
    interval: 5000,
  },

  mission: {
    eyebrow: "WHY WE EXIST",
    title: "피트니스 시장,\n우리가 바꿉니다.",
    body: "여전히 많은 사람들이 운동을 어렵고 부담스럽게 느낍니다. 피트니스스타는 누구나 즐겁게 운동하고, 꾸준히 성장할 수 있는 새로운 운동 경험을 만들어 시장의 기준을 다시 씁니다.",
    image: "/images/private/mission.jpg",
  },

  stats: {
    eyebrow: "BY THE NUMBERS",
    title: "숫자로 보는 피트니스스타",
    items: [
      { value: "3+", label: "광주 · 전남 지점" },
      { value: "10만명+", label: "누적 회원" },
      { value: "10년", label: "지속 성장" },
      { value: "98%", label: "회원 재등록률" },
    ],
  },

  brands: {
    eyebrow: "OUR BRANDS",
    title: "피트니스를 혁신하는\n대표 브랜드",
    items: [
      {
        name: "STAR GYM",
        tagline: "누구나 한 번 더 운동하게 만드는 공간",
        description:
          "20억 이상의 투자 1000평 이상의 규모 각 지역을 대표하는 초대형 헬스장.\n스마트 앱 성장 관리 시스템.",
        image: "/images/private/brand-gym.jpg",
      },
      {
        name: "TRAINING BRAND",
        tagline: "커뮤니티 기반 그룹 트레이닝",
        description:
          "함께 땀 흘리는 즐거움과 매일의 성취감을 결합한 피트니스 브랜드입니다.",
        image: "/images/private/brand-team.jpg",
      },
    ],
  },

  culture: {
    eyebrow: "OUR CULTURE",
    title: "우리가 일하는 방식",
    body: "최고의 동료와 함께, 빠르게 실행하고 성장합니다.",
    values: [
      {
        title: "고객에게 미친다",
        description: "모든 의사결정의 기준은 회원의 경험입니다.",
      },
      {
        title: "빠르게 실행한다",
        description: "완벽한 계획보다 빠른 실행과 학습을 택합니다.",
      },
      {
        title: "함께 승리한다",
        description: "개인의 성과가 아닌 팀의 성공을 추구합니다.",
      },
    ],
    image: "/images/private/culture.png",
  },

  /**
   * 함께하는 문화 (메인 포토 갤러리 섹션).
   * 단체사진은 private 폴더(깃 제외) — public/images/private/ 에 넣으세요.
   * tag/title 은 사진 설명으로 자유롭게 교체하면 됩니다.
   */
  community: {
    eyebrow: "LIFE AT FITNESS STAR",
    title: "함께 만드는 문화",
    body: "함께 배우고, 함께 성장하고, 함께 즐기는 사람들. 피트니스스타의 일상을 소개합니다.",
    items: [
      {
        tag: "TEAM",
        title: "단체 OT · 현장 교육",
        description:
          "신규 입사자도 빠르게 적응할 수 있도록, 현장에서 함께 배우고 익히는 교육을 진행합니다.",
        image: "/images/private/community-1.jpg",
        imagePosition: "50% 78%" as const,
      },
      {
        tag: "COMMUNITY",
        title: "전 지점 워크샵",
        description:
          "지점 구분 없이 모든 코치와 크루가 모여 노하우를 나누고 한 팀으로 호흡을 맞춥니다.",
        image: "/images/private/community-2.jpg",
        imagePosition: "center" as const,
      },
      {
        tag: "GROWTH",
        title: "비전트립 · 세미나",
        description:
          "해외 비전트립과 전문가 초청 세미나로 더 넓은 시야와 성장의 기회를 제공합니다.",
        image: "/images/private/community-3.jpg",
        imagePosition: "50% 72%" as const,
      },
    ],
  },

  jobGroups: {
    eyebrow: "JOB GROUPS",
    title: "당신의 자리를 찾아보세요",
    items: [
      {
        key: "office" as JobGroupKey,
        name: "오피스 직군",
        description:
          "기획·마케팅·디자인·경영지원 등 본사에서 브랜드와 사업의 성장을 이끕니다.",
        image: "/images/private/group-office.png",
        imagePosition: "center" as const,
      },
      {
        key: "field" as JobGroupKey,
        name: "현장 관리자",
        description:
          "지점 운영과 공간개발을 통해 현장의 고객 경험과 성과를 만듭니다.",
        image: "/images/private/group-fields.jpg",
        imagePosition: "50% 35%" as const,
      },
      {
        key: "coach" as JobGroupKey,
        name: "코치 · 크루",
        description:
          "수업과 현장 응대로 회원의 건강에 직접 기여하며 빠르게 성장합니다.",
        image: "/images/private/group-coach.jpg",
        imagePosition: "50% 35%" as const,
      },
    ],
  },

  /**
   * 복리후생 (메인 섹션, 이모지 그리드).
   * 공고 상세의 hiring.benefits 와는 별개로, 메인에서 가볍게 보여주는 용도.
   */
  perks: {
    eyebrow: "BENEFITS",
    title: "성장과 삶의 질, 둘 다 챙깁니다",
    body: "코치와 크루가 오래 일할 수 있도록 다양한 혜택을 제공합니다.",
    // icon 값은 Perks.tsx 의 아이콘 맵 키 (lucide-react)
    items: [
      { icon: "wallet", label: "인센티브제" },
      { icon: "shield", label: "4대보험" },
      { icon: "calendar", label: "월차 · 연차 · 정기휴가" },
      { icon: "graduation", label: "전문 교육 지원" },
      { icon: "dumbbell", label: "헬스장 무료 이용" },
      { icon: "trophy", label: "우수사원 표창 · 포상" },
      { icon: "gift", label: "명절 귀향비 · 경조금" },
      { icon: "trending", label: "커리어 개발 지원" },
    ],
  },

  contact: {
    eyebrow: "GET IN TOUCH",
    title: "어떤 포지션이 맞을지\n고민되시나요?",
    body: "궁금한 점이나 추천이 필요하다면 언제든 채용팀에 문의해 주세요.",
  },

  /**
   * 모든 공고 상세 페이지에 공통으로 들어가는 내용.
   * (업무환경 / 복지혜택 / 채용절차 / 문의)
   */
  hiring: {
    workEnvironment: [
      "OKR 기반의 목표 수립",
      "정기적인 성과 회고 시스템",
      "분기별 동료 피드백을 통한 성장",
      "성과에 따른 투명한 보상",
    ],
    benefits: [
      {
        group: "안정적인 근무",
        items: ["4대보험", "월차 · 연차", "정기 휴가"],
      },
      {
        group: "확실한 보상",
        items: ["인센티브제", "우수사원 표창 · 포상"],
      },
      {
        group: "함께하는 복지",
        items: ["명절 귀향비 지급", "각종 경조금"],
      },
    ],
    processFlow: ["서류 접수", "서류 전형", "면접 전형", "최종 합격 및 입사"],
    process: [
      {
        step: "서류 접수",
        detail: ["지원서를 접수받습니다."],
      },
      {
        step: "서류 전형",
        detail: ["지원서를 검토 후 면접 대상자에게 개별 연락드립니다."],
      },
      {
        step: "면접 전형",
        detail: [
          "직무 역량과 컬처핏을 확인하는 면접입니다.",
          "실무자 및 리더와 진행됩니다.",
        ],
      },
      {
        step: "최종 합격 및 입사",
        detail: ["처우 협의 후 최종 합격하여 입사하게 됩니다."],
      },
    ],
    processNote: "* 포지션에 따라 과제 전형이 추가될 수 있습니다.",
  },

  /** 지원서 폼 설정 (제출 서류 / 동의 항목) */
  apply: {
    documents: [
      { name: "이력서", required: true, note: "PDF 형식으로 올려주세요." },
      {
        name: "포트폴리오",
        required: false,
        note: "PDF 형식으로 올려주세요. (선택)",
      },
    ],
    terms: [
      {
        id: "privacy-required",
        title: "개인정보 필수항목 수집 및 이용 동의",
        required: true,
      },
      {
        id: "privacy-optional",
        title: "개인정보 선택항목 수집 및 이용 동의",
        required: false,
      },
      {
        id: "third-party",
        title: "개인정보 제3자 이용제공 동의",
        required: false,
      },
    ],
  },
} as const;

export type Site = typeof site;
