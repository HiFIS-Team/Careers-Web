const STYLES: Record<string, string> = {
  접수: "bg-neutral-100 text-neutral-600",
  합격: "bg-green-100 text-green-700",
  불합격: "bg-red-100 text-red-600",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = STYLES[status] ?? STYLES["접수"];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}
