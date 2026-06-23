import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { getOpening } from "@/lib/openings";
import { site } from "@/data/site";

// 공고를 DB에서 읽으므로 요청 시 렌더링
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opening = await getOpening(id);
  if (!opening) return { title: "공고를 찾을 수 없습니다" };
  return {
    title: `${opening.title} | ${site.brand.name} 채용`,
    description: opening.summary,
  };
}

/** 제목 + 불릿 리스트 (내용 없으면 렌더링 안 함) */
function Block({ title, items }: { title: string; items?: readonly string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      <ul className="mt-4 space-y-2.5">
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

export default async function OpeningDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opening = await getOpening(id);
  if (!opening) notFound();

  const { hiring, brand } = site;
  const applyHref = opening.applyUrl ?? `/openings/${opening.id}/apply`;
  const applyExternal = Boolean(opening.applyUrl);
  const mapAddress = opening.address;
  const meta: [string, string][] = [
    ["직무", opening.job],
    ["고용형태", opening.employment],
    ["경력", opening.career],
    ...(opening.salary && opening.salary.length > 0
      ? ([["급여", opening.salary.join("\n")]] as [string, string][])
      : []),
    ...(opening.workHours && opening.workHours.length > 0
      ? ([["근무 시간", opening.workHours.join("\n")]] as [string, string][])
      : []),
    ["근무지", opening.location],
  ];

  return (
    <>
      <Header />
      <main className="bg-white pb-24 lg:pb-16">
        <Container className="py-12">
          <Link
            href="/#openings"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← 전체 공고
          </Link>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* 본문 */}
            <article className="min-w-0">
              <div className="flex items-center gap-2">
                {opening.hot && (
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand">
                    🔥 HOT
                  </span>
                )}
                <span className="text-sm font-medium text-neutral-500">
                  {opening.job}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                {opening.title}
              </h1>

              {opening.description && (
                <p className="mt-6 text-lg leading-relaxed text-neutral-700">
                  {opening.description}
                </p>
              )}

              <Block title="🚀 포지션의 매력" items={opening.appeal} />
              <Block title="핵심 업무" items={opening.responsibilities} />
              <Block title="자격 요건" items={opening.qualifications} />
              <Block title="우대 사항" items={opening.preferred} />
              <Block title="업무 환경" items={hiring.workEnvironment} />

              {/* 복지 혜택 */}
              <section className="mt-12">
                <h2 className="text-xl font-bold text-neutral-900">복지 혜택</h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-3">
                  {hiring.benefits.map((b) => (
                    <div
                      key={b.group}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-5"
                    >
                      <p className="font-bold text-brand">{b.group}</p>
                      <ul className="mt-3 space-y-1.5 text-sm text-neutral-700">
                        {b.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 채용 절차 */}
              <section className="mt-12">
                <h2 className="text-xl font-bold text-neutral-900">채용 절차</h2>
                <div className="mt-4 flex flex-wrap items-center gap-y-2">
                  {hiring.processFlow.map((step, i) => (
                    <span key={step} className="inline-flex items-center">
                      {i > 0 && (
                        <span className="px-2 text-neutral-400">→</span>
                      )}
                      <span className="rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-semibold text-white">
                        {step}
                      </span>
                    </span>
                  ))}
                </div>
                <ol className="mt-6 space-y-5">
                  {hiring.process.map((p, i) => (
                    <li key={p.step} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-neutral-900">
                          {p.step}
                        </p>
                        <ul className="mt-1 space-y-0.5 text-sm text-neutral-600">
                          {p.detail.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-sm text-neutral-400">
                  {hiring.processNote}
                </p>
              </section>

              {/* 문의 */}
              <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h2 className="text-lg font-bold text-neutral-900">문의</h2>
                <p className="mt-2 text-sm text-neutral-600">
                  궁금한 점은 언제든 편하게 연락 주세요. 영업일 기준 48시간 내
                  답변드립니다.
                </p>
                <a
                  href={`mailto:${brand.email}`}
                  className="mt-2 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  {brand.email}
                </a>
              </section>
            </article>

            {/* 사이드바 (정보 + 지원) */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-neutral-200 p-6">
                <dl className="space-y-3">
                  {meta.map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-4 text-sm">
                      <dt className="shrink-0 text-neutral-500">{k}</dt>
                      <dd className="whitespace-pre-line text-right font-semibold text-neutral-900">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* 지도 */}
                <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
                  <iframe
                    title="근무지 지도"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      mapAddress
                    )}&output=embed`}
                    className="h-40 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500">{mapAddress}</p>

                {applyExternal ? (
                  <a
                    href={applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 hidden w-full rounded-full bg-brand py-3.5 text-center text-base font-bold text-neutral-950 transition-transform hover:scale-[1.02] lg:block"
                  >
                    지원하기
                  </a>
                ) : (
                  <Link
                    href={applyHref}
                    className="mt-6 hidden w-full rounded-full bg-brand py-3.5 text-center text-base font-bold text-neutral-950 transition-transform hover:scale-[1.02] lg:block"
                  >
                    지원하기
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </main>

      {/* 모바일 하단 고정 지원 바 */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        {applyExternal ? (
          <a
            href={applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-brand py-3.5 text-center text-base font-bold text-neutral-950"
          >
            지원하기
          </a>
        ) : (
          <Link
            href={applyHref}
            className="block w-full rounded-full bg-brand py-3.5 text-center text-base font-bold text-neutral-950"
          >
            지원하기
          </Link>
        )}
      </div>

      <Footer />
    </>
  );
}
