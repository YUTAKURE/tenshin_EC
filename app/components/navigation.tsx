'use client';

import Link from 'next/link';
import useStore from '@/store';
import Image from 'next/image';
import { useEffect } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
type ProfileType = Database['public']['Tables']['profiles']['Row'];
import Darkmode from './darkmode';

// ナビゲーション
const Navigation = ({
  session,
  profile,
}: {
  session?: Session | null;
  profile: ProfileType | null;
}) => {
  const { setUser } = useStore();

  // 状態管理にユーザー情報を保存
  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && profile ? profile.name : '',
      introduce: session && profile ? profile.introduce : '',
      avatar_url: session && profile ? profile.avatar_url : '',
    });
  }, [session, setUser, profile]);

  return (
    <header className="shadow-custom-dark dark:shadow-custom-light">
      <div className="py-5 container max-w-screen-lg w-11/12 mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-md md:text-xl font-bold text-red-600 dark:text-yellow-300 cursor-pointer font-title"
        >
          中華 天心
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold">
            {session ? (
              <div className="flex items-center space-x-5">
                <Link href="/settings/order">
                  {/* <div className="relative w-10 h-10">
                    <Image
                      src={
                        profile && profile.avatar_url
                          ? profile.avatar_url
                          : '/default.png'
                      }
                      className="rounded-full object-cover"
                      alt="avatar"
                      fill
                    />
                  </div> */}
                  <p className="text-xs md:text-sm">会員メニュー</p>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-5">
                <Link href="/auth/login" className="text-xs md:text-sm">
                  ログイン
                </Link>
                <Link href="/auth/signup" className="text-xs md:text-sm">
                  新規登録
                </Link>
              </div>
            )}
          </div>

          <Darkmode />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
