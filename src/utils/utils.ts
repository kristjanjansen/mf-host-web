import { useEffect, useState } from "react";
import type { MfConfig } from "../config/config";

const loaded = new Map<string, Promise<void>>();

function getSrc(mf: MfConfig) {
  return (import.meta as any).env[mf.env] + "/index.js";
}

function loadScript(src: string): Promise<void> {
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

export function useMfScript(mf: MfConfig) {
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
