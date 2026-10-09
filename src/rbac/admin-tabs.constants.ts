export const ADMIN_TAB_RESOURCE_TYPES = [
  'admin_tab:dashboard',
  'admin_tab:blog',
  'admin_tab:emails',
  'admin_tab:settings',
  'admin_tab:rbac',
] as const;

export type AdminTabResourceType = (typeof ADMIN_TAB_RESOURCE_TYPES)[number];

// RBAC's own sub-items are deliberately excluded — they must stay reachable
// regardless of grants, since they're where grants themselves get managed.
export const ADMIN_SUBTAB_RESOURCE_TYPES = [
  'admin_tab:blog:all-blogs',
  'admin_tab:blog:add-a-new-blog',
  'admin_tab:blog:authors',
  'admin_tab:blog:categories',
  'admin_tab:emails:all-emails',
  'admin_tab:settings:forms',
  'admin_tab:settings:form-types',
  'admin_tab:settings:team',
  'admin_tab:settings:departments',
  'admin_tab:settings:designations',
] as const;

export const ALL_ADMIN_RESOURCE_TYPES = [
  ...ADMIN_TAB_RESOURCE_TYPES,
  ...ADMIN_SUBTAB_RESOURCE_TYPES,
] as const;
