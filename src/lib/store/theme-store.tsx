// lib/store/themeStore.ts
import { create } from 'zustand';

interface ThemeState {
    isDark: boolean;
    toggleDark: () => void;
    setDark: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    isDark: false,
    toggleDark: () => set((state) => ({ isDark: !state.isDark })),
    setDark: (value) => set({ isDark: value }),
}));