import { tv } from "tailwind-variants";

// --- Header layout variants ---

export const headerContainer = tv({
  base: "z-10 flex-row items-center justify-between border-b border-[#e5e5e5] bg-white dark:border-[#353535] dark:bg-black",
  variants: {
    platform: {
      web: "px-4 py-3 lg:px-6 lg:py-4",
      electron: "h-[38px] pl-20 pr-6",
    },
  },
  defaultVariants: { platform: "web" },
});

export const headerLeftGroup = tv({
  base: "flex-row items-center",
  variants: {
    platform: {
      web: "gap-4 lg:gap-8",
      electron: "gap-4",
    },
  },
  defaultVariants: { platform: "web" },
});

export const navGroup = tv({
  base: "flex-row",
  variants: {
    platform: {
      web: "ml-4 hidden gap-2 lg:flex",
      electron: "gap-1",
    },
  },
  defaultVariants: { platform: "web" },
});

export const iconGroup = tv({
  base: "flex-row items-center",
  variants: {
    platform: {
      web: "gap-2 lg:gap-3",
      electron: "gap-1.5",
    },
  },
  defaultVariants: { platform: "web" },
});

export const profileButton = tv({
  base: "items-center justify-center bg-[#f0f0f0] dark:bg-[rgba(81,81,81,0.3)]",
  variants: {
    platform: {
      web: "ml-0.5 size-9 rounded-xl lg:ml-1 lg:size-10 lg:rounded-2xl",
      electron: "ml-0.5 size-6",
    },
  },
  defaultVariants: { platform: "web" },
});

// --- Breadcrumb variants ---

export const breadcrumbContainer = tv({
  base: "w-full flex-row items-center border-b border-[#e5e5e5] bg-[#f5f5f5] dark:border-[#353535] dark:bg-[#222]",
  variants: {
    platform: {
      web: "gap-2 px-4 py-2 lg:px-6 lg:py-2.5",
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
  base: "font-medium text-[#666666] dark:text-[#949494]",
  variants: {
    platform: {
      web: "text-xs lg:text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: { platform: "web" },
});

export const breadcrumbSeparator = tv({
  base: "text-[#888888] dark:text-[#bababa]",
  variants: {
    platform: {
      web: "text-xs lg:text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: { platform: "web" },
});

export const breadcrumbCurrent = tv({
  base: "font-semibold text-[#1a1a1a] dark:text-white",
  variants: {
    platform: {
      web: "text-xs lg:text-sm",
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
      true: "bg-nav-active dark:bg-[rgba(255,255,255,0.1)]",
      false: "bg-transparent hover:bg-[#f0f0f0] dark:hover:bg-[rgba(255,255,255,0.05)]",
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
      true: "font-bold text-nav-active-text dark:text-white",
      false: "font-semibold text-[#333333] dark:text-[#e6e7eb]",
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
      web: "size-9 rounded-xl bg-[#f0f0f0] dark:bg-[rgba(81,81,81,0.3)] lg:size-10 lg:rounded-2xl",
      electron: "size-6",
    },
  },
  defaultVariants: {
    platform: "web",
  },
});

export const badge = tv({
  base: "absolute -right-1 -top-1 items-center justify-center rounded-full border-2 border-white dark:border-black bg-[#ff5c5c]",
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
  base: "font-semibold text-[#666666] dark:text-[#949494]",
  variants: {
    platform: {
      web: "text-xs lg:text-sm",
      electron: "text-xs",
    },
  },
  defaultVariants: {
    platform: "web",
  },
});
