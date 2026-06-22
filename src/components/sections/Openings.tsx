"use client";

import { useMemo, useState } from "react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { OpeningCard } from "@/components/ui/OpeningCard";
import { openings } from "@/data/openings";
import { site } from "@/data/site";
import type { CareerType, EmploymentType, JobGroupKey } from "@/lib/types";

type GroupFilter = "all" | JobGroupKey;
type EmploymentFilter = "all" | EmploymentType;
type CareerFilter = "all" | CareerType;

const GROUP_FILTERS: { key: GroupFilter; label: string }[] = [
  { key: "all", label: "전체" },
  ...site.jobGroups.items.map((g) => ({ key: g.key, label: g.name })),
];

/** 라벨 + 칩 버튼 한 줄 (그리드 정렬) */
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
  // 그리드 셀 2개(라벨 + 칩)를 반환해 줄마다 열을 맞춤
  return (
    <>
      <span className="self-center text-sm font-semibold text-neutral-400 sm:text-right">
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
    </>
  );
}

export function Openings() {
  const [group, setGroup] = useState<GroupFilter>("all");
  const [employment, setEmployment] = useState<EmploymentFilter>("all");
  const [career, setCareer] = useState<CareerFilter>("all");

  // 데이터에 실제 존재하는 값으로만 필터 옵션 구성
  const employmentOptions = useMemo(
    () => [
      { key: "all" as EmploymentFilter, label: "전체" },
      ...Array.from(new Set(openings.map((o) => o.employment))).map((e) => ({
        key: e as EmploymentFilter,
        label: e,
      })),
    ],
    []
  );

  const careerOptions = useMemo(
    () => [
      { key: "all" as CareerFilter, label: "전체" },
      ...Array.from(new Set(openings.map((o) => o.career))).map((c) => ({
        key: c as CareerFilter,
        label: c,
      })),
    ],
    []
  );

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
    <Section id="openings">
      <div className="text-center">
        <Eyebrow>OPEN POSITIONS</Eyebrow>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          채용 중인 공고
        </h2>
      </div>

      {/* 필터 카드 */}
      <div className="mx-auto mt-10 w-fit max-w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 sm:px-10">
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
          <FilterRow
            label="직군"
            value={group}
            options={GROUP_FILTERS}
            onChange={setGroup}
          />
          <div className="col-span-2 h-px bg-neutral-200" />
          <FilterRow
            label="고용형태"
            value={employment}
            options={employmentOptions}
            onChange={setEmployment}
          />
          <FilterRow
            label="경력"
            value={career}
            options={careerOptions}
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
    </Section>
  );
}
