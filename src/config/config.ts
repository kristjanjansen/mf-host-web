export type MfConfig = {
  env: string;
  tag: string;
  route?: boolean;
  path?: string;
};

export const mfs: Record<string, MfConfig> = {
  layout: {
    env: "VITE_MF_LAYOUT_URL",
    tag: "mf-layout",
  },
  navigation: {
    env: "VITE_MF_NAVIGATION_URL",
    tag: "mf-navigation",
  },
  cookiebot: {
    env: "VITE_MF_COOKIEBOT_URL",
    tag: "mf-cookiebot",
  },
  billing: {
    route: true,
    env: "VITE_MF_BILLING_URL",
    tag: "mf-billing",
    path: "/billing",
  },
  dashboard: {
    route: true,
    env: "VITE_MF_DASHBOARD_URL",
    tag: "mf-dashboard",
    path: "/dashboard",
  },
};
