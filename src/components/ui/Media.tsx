import Image from "next/image";

/**
 * 사진 또는 플레이스홀더를 렌더링합니다.
 * src가 있으면 이미지를, 없으면 보기 좋은 플레이스홀더를 표시합니다.
 * 부모가 크기/비율(aspect-*)을 지정하는 것을 전제로 absolute fill 합니다.
 */
export function Media({
  src,
  alt,
  label,
  className = "",
  sizes = "100vw",
  priority = false,
  position = "center",
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** 이미지 crop 기준 위치 (예: "center", "50% 35%") — 인물 잘림 방지용 */
  position?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 text-neutral-400">
          <span className="text-2xl">📷</span>
          <span className="text-xs font-medium tracking-wide">
            {label ?? "이미지 자리"}
          </span>
        </div>
      )}
    </div>
  );
}
