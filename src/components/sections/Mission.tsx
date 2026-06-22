import { Media } from "@/components/ui/Media";
import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function Mission() {
  const { mission } = site;
  return (
    <Section dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>{mission.eyebrow}</Eyebrow>
          <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight sm:text-4xl">
            {mission.title}
          </h2>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-neutral-300">
            {mission.body}
          </p>
        </div>
        <Media
          src={mission.image}
          alt="미션"
          label="미션 이미지"
          className="aspect-[3/2] w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </Section>
  );
}
