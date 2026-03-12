export const isElectron =
  typeof window !== "undefined" &&
  !!(window as unknown as { electronAPI?: { isElectron?: boolean } })
    .electronAPI?.isElectron;
