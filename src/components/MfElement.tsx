import type { ReactNode } from "react";

import type { MfConfig } from "../config/config";
import { useMfScript } from "../utils/utils";
import { Loading } from "./Loading";

export function MfElement({
  mf,
  slot,
  children,
}: {
  mf: MfConfig;
  slot?: string;
  children?: ReactNode;
}) {
  const ready = useMfScript(mf);

  if (!ready) {
    return <Loading slot={slot} />;
  }

  const Tag = mf.tag as any;

  if (children != null) {
    return <Tag slot={slot}>{children}</Tag>;
  }

  return <Tag slot={slot} />;
}
