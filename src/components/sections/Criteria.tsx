import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function Criteria() {
  const { criteria } = site;
  return (
    <Section className="bg-neutral-50">
      <div className="max-w-2xl">
        <Eyebrow>{criteria.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {criteria.title}
        </h2>
        <p className="mt-4 text-lg text-neutral-600">{criteria.body}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {criteria.items.map((item) => (
          <div
            key={item.no}
            className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-200"
          >
            <span className="text-2xl font-extrabold text-brand">
              {item.no}
            </span>
            <h3 className="mt-3 text-lg font-bold text-neutral-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
