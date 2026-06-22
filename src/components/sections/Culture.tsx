import { Media } from "@/components/ui/Media";
import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function Culture() {
  const { culture } = site;
  return (
    <Section id="culture" dark>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Media
          src={culture.image}
          alt="조직문화"
          label="조직문화 이미지"
          className="order-last aspect-[3/2] w-full lg:order-first"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div>
          <Eyebrow>{culture.eyebrow}</Eyebrow>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {culture.title}
          </h2>
          <p className="mt-4 text-lg text-neutral-300">{culture.body}</p>

          <ul className="mt-8 space-y-5">
            {culture.values.map((value) => (
              <li key={value.title} className="flex gap-4">
                <span className="mt-1 text-brand">★</span>
                <div>
                  <p className="font-bold text-white">{value.title}</p>
                  <p className="text-neutral-400">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
