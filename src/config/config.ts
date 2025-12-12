export type AppKind = "navigation" | "layout" | "route";

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
