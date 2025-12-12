import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { MfConfig } from "../config/config";
import { useMfScript } from "../utils/utils";

export function MfNavigation({ mf, slot }: { mf: MfConfig; slot?: string }) {
  const ready = useMfScript(mf);
  const ref = useRef<HTMLElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    ref.current?.setAttribute("current-path", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!ready) return;

    const el = ref.current;
    if (!el) return;

    const handler = (evt: Event) => {
      const path = (evt as CustomEvent<{ path: string }>).detail?.path;
      if (path) navigate(path);
    };

    el.addEventListener("mf:navigate", handler);
    return () => el.removeEventListener("mf:navigate", handler);
  }, [navigate, ready]);

  if (!ready) {
    return <div slot={slot}>Loading navigation</div>;
  }

  const NavTag = mf.tag as any;

  return <NavTag ref={ref} slot={slot} current-path={location.pathname} />;
}
