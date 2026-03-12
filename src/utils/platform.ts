export const isElectron =
  typeof window !== 'undefined' && !!(window as any).electronAPI?.isElectron;
