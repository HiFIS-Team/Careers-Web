import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function Stats() {
  const { stats } = site;
  return (
    <Section className="bg-neutral-50">
      <div className="text-center">
        <Eyebrow>{stats.eyebrow}</Eyebrow>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {stats.title}
        </h2>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-4xl font-extrabold text-brand sm:text-5xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm font-medium text-neutral-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
