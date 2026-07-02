import { Check, ChevronRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function Career() {
  const { career } = site;
  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>{career.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {career.title}
        </h2>
        <p className="mt-4 text-lg text-neutral-600">{career.body}</p>
      </div>

      {/* 관리자 트랙 경로 */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {career.track.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-full bg-brand/10 px-5 py-2 font-bold text-brand">
              {step}
            </span>
            {i < career.track.length - 1 && (
              <ChevronRight className="size-5 text-neutral-400" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* 실제 성장 사례 */}
        <div className="grid gap-4 sm:grid-cols-2">
          {career.cases.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl bg-neutral-900 p-6 text-white"
            >
              <p className="text-sm font-semibold text-brand">{c.branch}</p>
              <h3 className="mt-1 text-xl font-bold">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                {c.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 성장 포인트 */}
        <ul className="space-y-4">
          {career.points.map((p) => (
            <li key={p} className="flex gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-brand" />
              <span className="text-neutral-700">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
