import type { MfConfig } from "../config/config";
import { useMfScript } from "../utils/utils";

export function MfRoute({ mf, slot }: { mf: MfConfig; slot?: string }) {
  const ready = useMfScript(mf);
  const label = mf.label ?? mf.id;

  if (!ready) {
    return (
      <div slot={slot}>
        <div>Loading {label}…</div>
      </div>
    );
  }

  const Tag = mf.tag as any;

  return <Tag slot={slot} />;
}
