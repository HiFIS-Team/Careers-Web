"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";

const EMPLOYMENTS = ["정규직", "계약직", "인턴", "파트타임"];
const CAREERS = ["신입", "경력", "경력무관"];

type Defaults = {
  title?: string;
  group?: string;
  job?: string;
  location?: string;
  address?: string | null;
  employment?: string;
  career?: string;
  salary?: string | null;
  workHours?: string[];
  summary?: string;
  hot?: boolean;
  published?: boolean;
  applyUrl?: string | null;
  description?: string | null;
  appeal?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  preferred?: string[];
  sortOrder?: number;
};

/** 미리보기에 쓸 폼 스냅샷 */
type PreviewData = {
  title: string;
  job: string;
  location: string;
  employment: string;
  career: string;
  salary: string;
  workHours: string[];
  hot: boolean;
  description: string;
  appeal: string[];
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
};

const label = "block text-sm font-semibold text-neutral-700";
const hint = "font-normal text-neutral-400";
const field =
  "mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

function SectionCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-base font-bold text-neutral-900">{title}</h2>
      {desc && <p className="mt-0.5 text-sm text-neutral-500">{desc}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

/** 폼 → 미리보기 데이터로 변환 */
function readForm(form: HTMLFormElement): PreviewData {
  const fd = new FormData(form);
  const str = (k: string) => String(fd.get(k) ?? "").trim();
  const lines = (k: string) =>
    String(fd.get(k) ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    title: str("title"),
    job: str("job"),
    location: str("location"),
    employment: str("employment"),
    career: str("career"),
    salary: str("salary"),
    workHours: lines("workHours"),
    hot: fd.get("hot") === "on",
    description: str("description"),
    appeal: lines("appeal"),
    responsibilities: lines("responsibilities"),
    qualifications: lines("qualifications"),
    preferred: lines("preferred"),
  };
}

/** 미리보기 본문의 제목 + 불릿 블록 */
function PreviewBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-8">
      <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-neutral-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 공고 상세 화면을 본뜬 미리보기 모달 */
function PreviewModal({
  data,
  onClose,
}: {
  data: PreviewData;
  onClose: () => void;
}) {
  const meta: [string, string][] = [
    ["직무", data.job],
    ["고용형태", data.employment],
    ["경력", data.career],
    ...(data.salary ? ([["급여", data.salary]] as [string, string][]) : []),
    ...(data.workHours.length > 0
      ? ([["근무 시간", data.workHours.join("\n")]] as [string, string][])
      : []),
    ["근무지", data.location],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <span className="text-sm font-bold text-neutral-500">
            공고 미리보기 <span className="font-normal">(실제 화면과 유사)</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm font-semibold text-neutral-500 hover:bg-neutral-100"
          >
            닫기 ✕
          </button>
        </div>

        {/* 본문 */}
        <div className="grid gap-8 p-6 lg:grid-cols-[1fr_280px]">
          <article className="min-w-0">
            <div className="flex items-center gap-2">
              {data.hot && (
                <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">
                  🔥 HOT
                </span>
              )}
              <span className="text-sm font-medium text-neutral-500">
                {data.job || "직무"}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              {data.title || "(제목 없음)"}
            </h1>
            {data.description && (
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-neutral-700">
                {data.description}
              </p>
            )}
            <PreviewBlock title="🚀 포지션의 매력" items={data.appeal} />
            <PreviewBlock title="핵심 업무" items={data.responsibilities} />
            <PreviewBlock title="자격 요건" items={data.qualifications} />
            <PreviewBlock title="우대 사항" items={data.preferred} />
          </article>

          {/* 사이드바 정보 */}
          <aside>
            <div className="rounded-2xl border border-neutral-200 p-5">
              <dl className="space-y-3">
                {meta.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <dt className="shrink-0 text-neutral-500">{k}</dt>
                    <dd className="whitespace-pre-line text-right font-semibold text-neutral-900">
                      {v || "-"}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 w-full rounded-full bg-brand py-3 text-center text-sm font-bold text-neutral-950">
                지원하기
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export function OpeningForm({
  action,
  defaults = {},
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaults?: Defaults;
  submitLabel: string;
}) {
  const groups = site.jobGroups.items;
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<PreviewData | null>(null);

  return (
    <form ref={formRef} action={action} className="space-y-6">
      {/* 기본 정보 */}
      <SectionCard title="기본 정보">
        <div>
          <label className={label}>제목 *</label>
          <input
            name="title"
            required
            defaultValue={defaults.title}
            className={field}
            placeholder="예) 브랜드 디자이너 (BX)"
          />
        </div>
        <div>
          <label className={label}>한 줄 요약 *</label>
          <input
            name="summary"
            required
            defaultValue={defaults.summary}
            className={field}
            placeholder="카드에 보이는 짧은 소개"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>직군 *</label>
            <select name="group" defaultValue={defaults.group ?? "office"} className={`${field} admin-select`}>
              {groups.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>직무 *</label>
            <input name="job" required defaultValue={defaults.job} className={field} placeholder="예) 디자인" />
          </div>
          <div>
            <label className={label}>근무지 *</label>
            <input name="location" required defaultValue={defaults.location} className={field} placeholder="예) 서울 본사" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>
              지도 주소 <span className={hint}>(선택 · 비우면 대표 주소)</span>
            </label>
            <input name="address" defaultValue={defaults.address ?? ""} className={field} placeholder="예) 서울특별시 강남구 테헤란로 123" />
          </div>
          <div>
            <label className={label}>고용형태 *</label>
            <select name="employment" defaultValue={defaults.employment ?? "정규직"} className={`${field} admin-select`}>
              {EMPLOYMENTS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>경력 *</label>
            <select name="career" defaultValue={defaults.career ?? "경력무관"} className={`${field} admin-select`}>
              {CAREERS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>
              급여 <span className={hint}>(선택)</span>
            </label>
            <input name="salary" defaultValue={defaults.salary ?? ""} className={field} placeholder="예) 면접 후 협의 / 3,000만원~" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>
              근무 시간 <span className={hint}>(선택 · 줄바꿈으로 여러 개)</span>
            </label>
            <textarea
              name="workHours"
              rows={3}
              defaultValue={(defaults.workHours ?? []).join("\n")}
              className={field}
              placeholder={"예) 주 5일 09:00~18:00\n토요일 09:00~13:00"}
            />
          </div>
          <div>
            <label className={label}>정렬 순서 <span className={hint}>(작을수록 위)</span></label>
            <input name="sortOrder" type="number" defaultValue={defaults.sortOrder ?? 0} className={field} />
          </div>
        </div>
      </SectionCard>

      {/* 상세 내용 */}
      <SectionCard title="상세 내용" desc="공고 상세 페이지에 표시됩니다. 비우면 해당 섹션은 숨겨집니다.">
        <div>
          <label className={label}>포지션 소개</label>
          <textarea name="description" rows={3} defaultValue={defaults.description ?? ""} className={field} />
        </div>
        {(
          [
            ["appeal", "포지션의 매력"],
            ["responsibilities", "핵심 업무"],
            ["qualifications", "자격 요건"],
            ["preferred", "우대 사항"],
          ] as const
        ).map(([name, ko]) => (
          <div key={name}>
            <label className={label}>
              {ko} <span className={hint}>(줄바꿈으로 항목 구분)</span>
            </label>
            <textarea
              name={name}
              rows={4}
              defaultValue={(defaults[name] ?? []).join("\n")}
              className={field}
            />
          </div>
        ))}
      </SectionCard>

      {/* 옵션 */}
      <SectionCard title="옵션">
        <div>
          <label className={label}>외부 지원 링크 <span className={hint}>(선택)</span></label>
          <input name="applyUrl" defaultValue={defaults.applyUrl ?? ""} className={field} placeholder="비우면 내부 지원 폼 사용" />
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-700 has-checked:border-brand has-checked:bg-brand/5">
            <input type="checkbox" name="hot" defaultChecked={defaults.hot} className="h-4 w-4 accent-[var(--color-brand)]" />
            🔥 HOT 표시
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-700 has-checked:border-brand has-checked:bg-brand/5">
            <input type="checkbox" name="published" defaultChecked={defaults.published ?? true} className="h-4 w-4 accent-[var(--color-brand)]" />
            공개(게시)
          </label>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            if (formRef.current) setPreview(readForm(formRef.current));
          }}
          className="rounded-full border border-neutral-300 bg-white px-6 py-3 font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          미리보기
        </button>
        <button
          type="submit"
          className="rounded-full bg-brand px-8 py-3 font-bold text-neutral-950 transition-transform hover:scale-[1.02]"
        >
          {submitLabel}
        </button>
      </div>

      {preview && (
        <PreviewModal data={preview} onClose={() => setPreview(null)} />
      )}
    </form>
  );
}
