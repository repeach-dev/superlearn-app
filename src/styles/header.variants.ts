import { tv } from 'tailwind-variants';

// --- Header layout variants ---

export const headerContainer = tv({
  base: 'bg-white flex-row items-center justify-between border-b border-slate-200 z-10',
  variants: {
    platform: {
      web: 'px-6 py-4',
      electron: 'pl-20 pr-6 h-[38px]',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const headerLeftGroup = tv({
  base: 'flex-row items-center',
  variants: {
    platform: {
      web: 'gap-8',
      electron: 'gap-4',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const navGroup = tv({
  base: 'flex-row',
  variants: {
    platform: {
      web: 'gap-2 ml-4',
      electron: 'gap-1',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const iconGroup = tv({
  base: 'flex-row items-center',
  variants: {
    platform: {
      web: 'gap-3',
      electron: 'gap-1.5',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const profileButton = tv({
  base: 'items-center justify-center bg-slate-50',
  variants: {
    platform: {
      web: 'w-10 h-10 rounded-2xl ml-1',
      electron: 'w-6 h-6 ml-0.5',
    },
  },
  defaultVariants: { platform: 'web' },
});

// --- Breadcrumb variants ---

export const breadcrumbContainer = tv({
  base: 'w-full flex-row items-center bg-slate-50 border-b border-slate-100',
  variants: {
    platform: {
      web: 'px-6 py-2.5 gap-2',
      electron: 'px-6 py-1.5 gap-1.5 z-20',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const breadcrumbInner = tv({
  base: 'w-full max-w-screen-xl mx-auto flex-row items-center',
  variants: {
    platform: {
      web: 'gap-2',
      electron: 'gap-1.5',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const breadcrumbText = tv({
  base: 'font-medium text-slate-400',
  variants: {
    platform: {
      web: 'text-sm',
      electron: 'text-xs',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const breadcrumbSeparator = tv({
  base: 'text-slate-300',
  variants: {
    platform: {
      web: 'text-sm',
      electron: 'text-xs',
    },
  },
  defaultVariants: { platform: 'web' },
});

export const breadcrumbCurrent = tv({
  base: 'text-slate-700 font-semibold',
  variants: {
    platform: {
      web: 'text-sm',
      electron: 'text-xs',
    },
  },
  defaultVariants: { platform: 'web' },
});

// --- Nav item variants ---

export const navItem = tv({
  base: 'rounded-xl transition-colors',
  variants: {
    active: {
      true: 'bg-nav-active',
      false: 'bg-transparent hover:bg-slate-50',
    },
    platform: {
      web: 'px-4 py-2',
      electron: 'px-2 py-0.5',
    },
  },
  defaultVariants: {
    active: false,
    platform: 'web',
  },
});

export const navText = tv({
  variants: {
    active: {
      true: 'font-bold text-nav-active-text',
      false: 'font-semibold text-nav-inactive-text',
    },
    platform: {
      web: 'text-nav-web',
      electron: 'text-nav-electron',
    },
  },
  defaultVariants: {
    active: false,
    platform: 'web',
  },
});

export const iconButton = tv({
  base: 'items-center justify-center',
  variants: {
    platform: {
      web: 'w-10 h-10 rounded-2xl bg-slate-50',
      electron: 'w-6 h-6',
    },
  },
  defaultVariants: {
    platform: 'web',
  },
});

export const badge = tv({
  base: 'absolute -top-1 -right-1 bg-red-500 rounded-full items-center justify-center border-2 border-white',
  variants: {
    platform: {
      web: 'w-4 h-4',
      electron: 'w-3.5 h-3.5',
    },
  },
  defaultVariants: {
    platform: 'web',
  },
});

export const badgeText = tv({
  base: 'text-white font-bold',
  variants: {
    platform: {
      web: 'text-[9px]',
      electron: 'text-[7px]',
    },
  },
  defaultVariants: {
    platform: 'web',
  },
});

export const logoutText = tv({
  base: 'text-slate-500 font-semibold',
  variants: {
    platform: {
      web: 'text-sm',
      electron: 'text-xs',
    },
  },
  defaultVariants: {
    platform: 'web',
  },
});
