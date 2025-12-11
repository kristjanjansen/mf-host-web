import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

type AppKind = "navigation" | "layout" | "route";

export type MfConfig = {
  env: string;
  id: string;
  kind: AppKind;
  tag: string;
  path?: string;
  label?: string;
};

export const mfs: Record<string, MfConfig> = {
  layout: {
    env: "VITE_MF_LAYOUT_URL",
    id: "layout",
    kind: "layout",
    tag: "mf-layout",
  },
  navigation: {
    env: "VITE_MF_NAVIGATION_URL",
    id: "navigation",
    kind: "navigation",
    tag: "mf-navigation",
  },
  billing: {
    env: "VITE_MF_BILLING_URL",
    id: "billing",
    kind: "route",
    tag: "mf-billing",
    path: "/billing",
    label: "Billing",
  },
  dashboard: {
    env: "VITE_MF_DASHBOARD_URL",
    id: "dashboard",
    kind: "route",
    tag: "mf-dashboard",
    path: "/dashboard",
    label: "Dashboard",
  },
};

const routeMfs = Object.values(mfs).filter((m) => m.kind === "route");

const getSrc = (mf: MfConfig) => (import.meta as any).env[mf.env] + "/index.js";

const loaded = new Map<string, Promise<void>>();

export function loadScript(src: string): Promise<void> {
  if (loaded.has(src)) return loaded.get(src)!;

  const p = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.type = "module";
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(el);
  });

  loaded.set(src, p);
  return p;
}

function useMfScript(mf: MfConfig) {
  const [ready, setReady] = useState(false);
  const url = getSrc(mf);

  useEffect(() => {
    let cancelled = false;
    loadScript(url)
      .then(() => !cancelled && setReady(true))
      .catch(() => !cancelled && setReady(false));
    return () => {
      cancelled = true;
    };
  }, [url]);

  return ready;
}

export default function App() {
  return (
    <div>
      <h1>Microfrontend Host</h1>

      <MfLayout mf={mfs.layout}>
        <MfNavigation mf={mfs.navigation} slot="content" />

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {routeMfs.map((r) => (
            <Route
              key={r.id}
              path={r.path}
              element={<MfRoute mf={r} slot="content" />}
            />
          ))}

          <Route path="*" element={<div slot="content">Not found</div>} />
        </Routes>
      </MfLayout>
    </div>
  );
}

function MfLayout({ mf, children }: { mf: MfConfig; children: ReactNode }) {
  const ready = useMfScript(mf);

  if (!ready) {
    return <div>Loading layout…</div>;
  }

  const LayoutTag = mf.tag as any;

  return <LayoutTag>{children}</LayoutTag>;
}

function MfNavigation({ mf, slot }: { mf: MfConfig; slot?: string }) {
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
    return <div slot={slot}>Loading navigation…</div>;
  }

  const NavTag = mf.tag as any;

  return <NavTag ref={ref} slot={slot} current-path={location.pathname} />;
}

function MfRoute({ mf, slot }: { mf: MfConfig; slot?: string }) {
  const ready = useMfScript(mf);
  const label = mf.label ?? mf.id;

  if (!ready) {
    return (
      <div slot={slot}>
        <h2>{label}</h2>
        <div>Loading {label.toLowerCase()}…</div>
      </div>
    );
  }

  const Tag = mf.tag as any;

  return <Tag slot={slot} />;
}
