export const ADMIN_TAB_RESOURCE_TYPES = [
  'admin_tab:dashboard',
  'admin_tab:blog',
  'admin_tab:emails',
  'admin_tab:settings',
  'admin_tab:rbac',
] as const;

export type AdminTabResourceType = (typeof ADMIN_TAB_RESOURCE_TYPES)[number];
