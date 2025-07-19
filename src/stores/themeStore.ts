import { create } from 'zustand';

type ThemeStore = {
  theme: string;
  toggleThemeMode: () => void;
};
export const useThemeStore = create<ThemeStore>((set) => {
  if (typeof window === 'undefined')
    return { theme: '', toggleThemeMode: () => {} };
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);

  return {
    theme: initialTheme,
    toggleThemeMode: () => {
      set((state) => {
        const newMode = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newMode);
        localStorage.setItem('theme', newMode);
        return { theme: newMode };
      });
    },
  };
});
