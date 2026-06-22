import { type ReactNode } from "react";

const SIZES = {
  default: "max-w-6xl",
  prose: "max-w-3xl",
  narrow: "max-w-2xl",
} as const;

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  /** 최대 너비 (default: 넓게 / prose: 본문 / narrow: 폼) */
  size?: keyof typeof SIZES;
}) {
  return (
    <div className={`mx-auto w-full ${SIZES[size]} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
