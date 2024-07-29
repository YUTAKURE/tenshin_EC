'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';

const Darkmode = () => {
  const [activeTheme, setTheme] = useThemeSwitcher();

  return (
    <div
      onClick={() => setTheme(activeTheme)}
      aria-label="Theme Switcher"
      className="ml-3 md:ml-8 p-3 rounded-xl cursor-pointer"
    >
      {activeTheme === 'dark' ? (
        <FiMoon className=" hover:text-gray-400 text-md md:text-xl" />
      ) : (
        <FiSun className=" hover:text-gray-400 text-md md:text-xl" />
      )}
    </div>
  );
};

export default Darkmode;
