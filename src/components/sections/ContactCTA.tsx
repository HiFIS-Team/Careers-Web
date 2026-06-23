import { Section, Eyebrow } from "@/components/ui/Section";
import { site } from "@/data/site";

export function ContactCTA() {
  const { contact, brand } = site;
  const useKakao = Boolean(brand.kakaoChannelUrl);
  return (
    <Section dark className="bg-neutral-950">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{contact.eyebrow}</Eyebrow>
        <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {contact.title}
        </h2>
        <p className="mt-5 text-lg text-neutral-300">{contact.body}</p>
        <a
          href={useKakao ? brand.kakaoChannelUrl : `mailto:${brand.email}`}
          target={useKakao ? "_blank" : undefined}
          rel={useKakao ? "noopener noreferrer" : undefined}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-neutral-950 transition-transform hover:scale-105"
        >
          {useKakao && <span aria-hidden>💬</span>}
          {useKakao ? "카카오톡으로 문의하기" : "채용팀에 문의하기"}
        </a>
        <p className="mt-4 text-sm text-neutral-500">
          {useKakao ? "카카오톡 채널로 연결됩니다" : brand.email}
        </p>
      </div>
    </Section>
  );
}
