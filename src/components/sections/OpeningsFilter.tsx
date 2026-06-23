"use client";

import { useState } from "react";
import { OpeningCard } from "@/components/ui/OpeningCard";
import { site } from "@/data/site";
import type {
  CareerType,
  EmploymentType,
  JobGroupKey,
  Opening,
} from "@/lib/types";

type GroupFilter = "all" | JobGroupKey;
type EmploymentFilter = "all" | EmploymentType;
type CareerFilter = "all" | CareerType;

const GROUP_FILTERS: { key: GroupFilter; label: string }[] = [
  { key: "all", label: "전체" },
  ...site.jobGroups.items.map((g) => ({ key: g.key, label: g.name })),
];

// 폼(OpeningForm)의 선택지와 동일하게 고정. 등록된 공고 유무와 무관하게 항상 표시.
const EMPLOYMENT_FILTERS: { key: EmploymentFilter; label: string }[] = [
  { key: "all", label: "전체" },
  ...(["정규직", "계약직", "인턴", "파트타임"] as EmploymentType[]).map((e) => ({
    key: e,
    label: e,
  })),
];

const CAREER_FILTERS: { key: CareerFilter; label: string }[] = [
  { key: "all", label: "전체" },
  ...(["신입", "경력", "경력무관"] as CareerType[]).map((c) => ({
    key: c,
    label: c,
  })),
];

/** 라벨 + 칩 버튼 한 줄 */
function FilterRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { key: T; label: string }[];
  onChange: (key: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
      <span className="text-sm font-semibold text-neutral-400 sm:w-16 sm:shrink-0 sm:pt-2 sm:text-right">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onChange(opt.key)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active
                  ? "border-neutral-900 bg-neutral-900 font-semibold text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OpeningsFilter({ openings }: { openings: Opening[] }) {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [employment, setEmployment] = useState<EmploymentFilter>("all");
  const [career, setCareer] = useState<CareerFilter>("all");

  const filtered = openings.filter(
    (o) =>
      (group === "all" || o.group === group) &&
      (employment === "all" || o.employment === employment) &&
      (career === "all" || o.career === career)
  );

  const isFiltered = group !== "all" || employment !== "all" || career !== "all";
  const reset = () => {
    setGroup("all");
    setEmployment("all");
    setCareer("all");
  };

  return (
    <>
      {/* 필터 카드 */}
      <div className="mx-auto mt-10 w-full max-w-xl rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-6 sm:w-fit sm:max-w-none sm:px-10">
        <div className="flex flex-col gap-4">
          <FilterRow
            label="직군"
            value={group}
            options={GROUP_FILTERS}
            onChange={setGroup}
          />
          <div className="h-px bg-neutral-200" />
          <FilterRow
            label="고용형태"
            value={employment}
            options={EMPLOYMENT_FILTERS}
            onChange={setEmployment}
          />
          <FilterRow
            label="경력"
            value={career}
            options={CAREER_FILTERS}
            onChange={setCareer}
          />
        </div>
      </div>

      {/* 결과 요약 */}
      <div className="mt-8 flex items-center justify-center gap-3 text-sm text-neutral-500">
        <span>
          총 <span className="font-bold text-brand">{filtered.length}</span>개의 공고
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={reset}
            className="text-neutral-400 underline-offset-2 hover:text-neutral-700 hover:underline"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 공고 그리드 */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((opening) => (
          <OpeningCard key={opening.id} opening={opening} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-neutral-500">
          조건에 맞는 공고가 없습니다.
        </p>
      )}
    </>
  );
}
