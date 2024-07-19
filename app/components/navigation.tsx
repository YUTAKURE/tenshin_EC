'use client';

import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import Link from 'next/link';
import type { Session } from '@supabase/auth-helpers-nextjs';

// ナビゲーション
const Navigation = ({ session }: { session?: Session | null }) => {
  const [activeTheme, setTheme] = useThemeSwitcher();

  return (
    <header className="shadow-custom-dark dark:shadow-custom-light">
      <div className="py-5 container max-w-screen-md mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          中華 天心
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">
            {session ? (
              <div className="flex items-center space-x-5">
                <Link href="/settings/profile">
                  <div>プロフィール</div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                <Link href="/auth/login">ログイン</Link>
                <Link href="/auth/signup">会員登録</Link>
              </div>
            )}
          </div>

          {/* Theme switcher large screen */}
          <div
            onClick={() => setTheme(activeTheme)}
            aria-label="Theme Switcher"
            className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {activeTheme === 'dark' ? (
              <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
            ) : (
              <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
