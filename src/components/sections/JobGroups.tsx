import { Media } from "@/components/ui/Media";
import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function JobGroups() {
  const { jobGroups } = site;
  return (
    <Section id="groups" className="bg-neutral-50">
      <div className="max-w-2xl">
        <Eyebrow>{jobGroups.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {jobGroups.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {jobGroups.items.map((group) => (
          <a
            key={group.key}
            href="#openings"
            className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <Media
              src={group.image}
              alt={group.name}
              label={`${group.name} 이미지`}
              className="aspect-[3/2] w-full"
              sizes="(min-width: 768px) 33vw, 100vw"
              position={group.imagePosition}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold group-hover:text-brand">
                {group.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                {group.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
