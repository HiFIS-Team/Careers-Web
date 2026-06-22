"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * 페이지(경로)가 바뀌면 즉시 최상단으로 이동.
 * - 해시(#...)가 있는 이동은 건너뛰어 해당 위치로 스크롤되게 둡니다.
 * - 같은 페이지 내 앵커 클릭은 경로가 안 바뀌므로 CSS smooth가 처리합니다.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
