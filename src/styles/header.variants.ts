import { tv } from "tailwind-variants";

// --- Header layout variants ---

export const headerContainer = tv({
  base: "z-10 flex-row items-center justify-between border-b border-slate-200 bg-white",
  variants: {
    platform: {
      web: "px-6 py-4",
      electron: "h-[38px] pl-20 pr-6",
    },
  },
  defaultVariants: { platform: "web" },
});

export const headerLeftGroup = tv({
  base: "flex-row items-center",
  variants: {
    platform: {
      web: "gap-8",
      electron: "gap-4",
    },
  },
  defaultVariants: { platform: "web" },
});

export const navGroup = tv({
  base: "flex-row",
  variants: {
    platform: {
      web: "ml-4 gap-2",
      electron: "gap-1",
    },
  },
  defaultVariants: { platform: "web" },
});

export const iconGroup = tv({
  base: "flex-row items-center",
  variants: {
    platform: {
      web: "gap-3",
      electron: "gap-1.5",
    },
  },
  defaultVariants: { platform: "web" },
});

export const profileButton = tv({
  base: "items-center justify-center bg-slate-50",
  variants: {
    platform: {
      web: "ml-1 size-10 rounded-2xl",
      electron: "ml-0.5 size-6",
    },
  },
  defaultVariants: { platform: "web" },
});

// --- Breadcrumb variants ---

export const breadcrumbContainer = tv({
  base: "w-full flex-row items-center border-b border-slate-100 bg-slate-50",
  variants: {
    platform: {
      web: "gap-2 px-6 py-2.5",
      electron: "z-20 gap-1.5 px-6 py-1.5",
    },
  },
  defaultVariants: { platform: "web" },
});

export const breadcrumbInner = tv({
  base: "mx-auto w-full max-w-screen-xl flex-row items-center",
  variants: {
    platform: {
      web: "gap-2",
      electron: "gap-1.5",
    },
  },
  defaultVariants: { platform: "web" },
});

export const breadcrumbText = tv({
  base: "font-medium text-slate-400",
  variants: {
    platform: {
      web: "text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: { platform: "web" },
});

export const breadcrumbSeparator = tv({
  base: "text-slate-300",
  variants: {
    platform: {
      web: "text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: { platform: "web" },
});

export const breadcrumbCurrent = tv({
  base: "font-semibold text-slate-700",
  variants: {
    platform: {
      web: "text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: { platform: "web" },
});

// --- Nav item variants ---

export const navItem = tv({
  base: "rounded-xl transition-colors",
  variants: {
    active: {
      true: "bg-nav-active",
      false: "bg-transparent hover:bg-slate-50",
    },
    platform: {
      web: "px-4 py-2",
      electron: "px-2 py-0.5",
    },
  },
  defaultVariants: {
    active: false,
    platform: "web",
  },
});

export const navText = tv({
  variants: {
    active: {
      true: "font-bold text-nav-active-text",
      false: "font-semibold text-nav-inactive-text",
    },
    platform: {
      web: "text-nav-web",
      electron: "text-nav-electron",
    },
  },
  defaultVariants: {
    active: false,
    platform: "web",
  },
});

export const iconButton = tv({
  base: "items-center justify-center",
  variants: {
    platform: {
      web: "size-10 rounded-2xl bg-slate-50",
      electron: "size-6",
    },
  },
  defaultVariants: {
    platform: "web",
  },
});

export const badge = tv({
  base: "absolute -right-1 -top-1 items-center justify-center rounded-full border-2 border-white bg-red-500",
  variants: {
    platform: {
      web: "size-4",
      electron: "size-3.5",
    },
  },
  defaultVariants: {
    platform: "web",
  },
});

export const badgeText = tv({
  base: "font-bold text-white",
  variants: {
    platform: {
      web: "text-[9px]",
      electron: "text-[7px]",
    },
  },
  defaultVariants: {
    platform: "web",
  },
});

export const logoutText = tv({
  base: "font-semibold text-slate-500",
  variants: {
    platform: {
      web: "text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: {
    platform: "web",
  },
});
