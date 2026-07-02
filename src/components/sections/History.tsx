import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function History() {
  const { history } = site;
  return (
    <Section dark>
      <div className="max-w-2xl">
        <Eyebrow>{history.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {history.title}
        </h2>
        <p className="mt-4 text-lg text-neutral-300">{history.body}</p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {history.items.map((item) => (
          <div
            key={item.branch}
            className="rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-7 ring-1 ring-white/10"
          >
            <p className="text-sm font-semibold tracking-[0.2em] text-brand">
              {item.year}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold text-white">
              {item.branch}
            </h3>
            <dl className="mt-5 space-y-2 text-neutral-300">
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <dt className="text-neutral-400">누적 회원</dt>
                <dd className="font-semibold text-white">{item.members}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-2">
                <dt className="text-neutral-400">규모</dt>
                <dd className="font-semibold text-white">{item.size}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
