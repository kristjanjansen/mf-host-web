import type { ReactNode } from "react";

export function Loading({
  slot,
  children,
}: {
  slot?: string;
  children?: ReactNode;
}) {
  return <div slot={slot}>{children ?? `Loading ${slot || ""}...`}</div>;
}
