import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const useThemeSwitcher = (): [Theme, any] => {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.theme : '',
  );
  const activeTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(activeTheme);
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme, activeTheme]);

  return [activeTheme, setTheme];
};

export default useThemeSwitcher;
