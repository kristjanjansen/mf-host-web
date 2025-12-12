import type { ReactNode } from "react";
import type { MfConfig } from "../config/config";
import { useMfScript } from "../utils/utils";

export function MfLayout({
  mf,
  children,
}: {
  mf: MfConfig;
  children: ReactNode;
}) {
  const ready = useMfScript(mf);

  if (!ready) {
    return <div>Loading layout…</div>;
  }

  const LayoutTag = mf.tag as any;

  return <LayoutTag>{children}</LayoutTag>;
}
