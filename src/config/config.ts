export type MfConfig = {
  route?: boolean;
  env: string;
  id: string;
  tag: string;
  path?: string;
  label?: string;
};

export const mfs: Record<string, MfConfig> = {
  layout: {
    id: "layout",
    tag: "mf-layout",
    env: "VITE_MF_LAYOUT_URL",
  },
  navigation: {
    id: "navigation",
    tag: "mf-navigation",
    env: "VITE_MF_NAVIGATION_URL",
  },
  dashboard: {
    route: true,
    id: "dashboard",
    tag: "mf-dashboard",
    path: "/dashboard",
    label: "Dashboard",
    env: "VITE_MF_DASHBOARD_URL",
  },
  billing: {
    route: true,
    id: "billing",
    tag: "mf-billing",
    path: "/billing",
    label: "Billing",
    env: "VITE_MF_BILLING_URL",
  },
};
