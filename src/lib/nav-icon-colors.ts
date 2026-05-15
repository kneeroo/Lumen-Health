// Per-route icon colour scheme so each section has its own identity in the
// sidebar and on the home page feature cards. The active-state styling
// (bg-primary text-primary-foreground) still wins when the user is on the
// matching page — these colours only apply to inactive icons.

export type IconColor = 'red' | 'green';

export const navIconColor: Record<string, IconColor> = {
  '/dashboard/home': 'green',
  '/dashboard/overview': 'green',
  '/dashboard/actions': 'green',
  '/dashboard/medications': 'green',
  '/dashboard/labs': 'green',
  '/dashboard/chat': 'green',
  '/dashboard/notifications': 'green'
};

// Inactive icon-only colour (for the sidebar nav buttons).
export const iconTextClass: Record<IconColor, string> = {
  red: 'text-red-600 dark:text-red-400',
  green: 'text-emerald-600 dark:text-emerald-400'
};

// Tinted background + text (for the home page feature card icon containers).
export const iconBoxClass: Record<IconColor, string> = {
  red: 'bg-red-500/10 text-red-600 dark:text-red-400',
  green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
};
