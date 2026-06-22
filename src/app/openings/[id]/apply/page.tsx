import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ApplyForm } from "@/components/ApplyForm";
import { openings, getOpening } from "@/data/openings";
import { site } from "@/data/site";

export function generateStaticParams() {
  return openings.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const opening = getOpening(id);
  return {
    title: opening
      ? `지원하기 · ${opening.title} | ${site.brand.name}`
      : "지원하기",
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opening = getOpening(id);
  if (!opening) notFound();

  return (
    <>
      <Header />
      <main className="bg-white py-12">
        <Container size="narrow">
          <Link
            href={`/openings/${opening.id}`}
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            ← 공고로 돌아가기
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            지원서 작성하기
          </h1>
          <p className="mt-3 flex items-center gap-2 text-neutral-600">
            {opening.hot && <span>🔥</span>}
            <span className="font-medium">{opening.title}</span>
          </p>

          <div className="mt-10">
            <ApplyForm
              documents={site.apply.documents}
              terms={site.apply.terms}
              brandEmail={site.brand.email}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
