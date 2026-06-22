"use client";

import { useMemo, useState } from "react";
import type { ApplyDocument, ApplyTerm } from "@/lib/types";

export function ApplyForm({
  documents,
  terms,
  brandEmail,
}: {
  documents: readonly ApplyDocument[];
  terms: readonly ApplyTerm[];
  brandEmail: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allAgreed = useMemo(
    () => terms.every((t) => agreed[t.id]),
    [terms, agreed]
  );

  const toggleAll = () => {
    const next = !allAgreed;
    setAgreed(Object.fromEntries(terms.map((t) => [t.id, next])));
  };

  const onFile = (docName: string, fileName: string | undefined) =>
    setFiles((prev) => ({ ...prev, [docName]: fileName ?? "" }));

  const validate = () => {
    if (!name.trim()) return "이름을 입력해 주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "올바른 이메일을 입력해 주세요.";
    if (!phone.trim()) return "전화번호를 입력해 주세요.";
    for (const d of documents)
      if (d.required && !files[d.name]) return `${d.name}을(를) 첨부해 주세요.`;
    for (const t of terms)
      if (t.required && !agreed[t.id])
        return "필수 동의 항목에 동의해 주세요.";
    return "";
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    // TODO: 실제 접수 백엔드/폼 서비스 연동 지점
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-10 text-center">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-4 text-2xl font-extrabold text-neutral-900">
          지원이 접수되었습니다
        </h2>
        <p className="mt-3 text-neutral-600">
          소중한 지원에 감사드립니다. 검토 후 기재해 주신 연락처로 안내드리겠습니다.
        </p>
        <a
          href="/#openings"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 font-bold text-neutral-950 transition-transform hover:scale-105"
        >
          다른 공고 보기
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full border-0 border-b border-neutral-300 bg-transparent py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-0";

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* 지원자 정보 */}
      <h2 className="text-2xl font-bold text-neutral-900">지원자 정보</h2>
      <div className="mt-6">
        <p className="text-lg font-bold text-neutral-900">
          기본 정보 <span className="text-sm text-brand">필수</span>
        </p>
        <div className="mt-4 space-y-5">
          <input
            className={inputClass}
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className={inputClass}
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className={inputClass}
            placeholder="전화번호 ('-' 없이 입력해 주세요)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* 제출 서류 */}
      <h2 className="mt-14 text-2xl font-bold text-neutral-900">제출 서류</h2>
      <div className="mt-6 space-y-8">
        {documents.map((doc) => (
          <div key={doc.name}>
            <p className="font-bold text-neutral-900">
              {doc.name}{" "}
              {doc.required ? (
                <span className="text-sm text-brand">필수</span>
              ) : (
                <span className="text-sm text-neutral-400">선택</span>
              )}
            </p>
            <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-5 py-5 text-neutral-500 transition-colors hover:border-brand">
              <span className="text-xl">📎</span>
              <span className="truncate">
                {files[doc.name] || "이곳에 파일을 올려주세요"}
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => onFile(doc.name, e.target.files?.[0]?.name)}
              />
            </label>
            {doc.note && (
              <p className="mt-2 text-sm text-neutral-400">* {doc.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* 동의 */}
      <h2 className="mt-14 text-xl font-bold text-neutral-900">
        지원을 위해 다음 사항을 확인해 주세요.
      </h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-neutral-200">
        <label className="flex cursor-pointer items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4">
          <input
            type="checkbox"
            className="h-4 w-4 accent-[var(--color-brand)]"
            checked={allAgreed}
            onChange={toggleAll}
          />
          <span className="font-semibold text-neutral-900">전체 동의</span>
        </label>
        {terms.map((t) => (
          <label
            key={t.id}
            className="flex cursor-pointer items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4 last:border-b-0"
          >
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[var(--color-brand)]"
                checked={!!agreed[t.id]}
                onChange={(e) =>
                  setAgreed((p) => ({ ...p, [t.id]: e.target.checked }))
                }
              />
              <span className="text-neutral-800">{t.title}</span>
            </span>
            <span
              className={`text-sm ${
                t.required ? "text-brand" : "text-neutral-400"
              }`}
            >
              {t.required ? "필수" : "선택"}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="mt-5 text-center text-sm font-medium text-brand">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-brand py-4 text-lg font-bold text-neutral-950 transition-transform hover:scale-[1.01]"
      >
        제출하기
      </button>
      <p className="mt-4 text-center text-sm text-neutral-400">
        문의: {brandEmail}
      </p>
    </form>
  );
}
