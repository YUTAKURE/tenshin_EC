'use client';

import {
  CreditCardIcon,
  SparklesIcon,
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// ナビゲーション
const subNavigation1 = [
  {
    name: '注文ページ',
    icon: CreditCardIcon,
    href: '/settings/order',
  },
  {
    name: '特典ページ',
    icon: SparklesIcon,
    href: '/settings/special',
  },
];

const subNavigation2 = [
  {
    name: 'プロフィール',
    icon: UserCircleIcon,
    href: '/settings/profile',
  },
  {
    name: 'メールアドレス',
    icon: EnvelopeIcon,
    href: '/settings/email',
  },
  {
    name: 'パスワード',
    icon: KeyIcon,
    href: '/settings/password',
  },
  {
    name: 'ログアウト',
    icon: ArrowLeftIcon,
    href: '/settings/logout',
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-6 sm:grid-cols-3 gap-3 ">
      <div className="col-span-1 text-sm space-y-1 font-medium flex flex-col w-10 sm:w-4/5 translate-x-2 sm:translate-x-0">
        {subNavigation1.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && 'bg-sky-100 text-sky-500'
              } hover:bg-sky-100 px-3 py-2 rounded-full`}
            >
              <div className="sm:hidden">
                <item.icon className="inline-block w-5 h-5 mr-2" />
              </div>
              <div className="hidden sm:block">
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </div>
            </div>
          </Link>
        ))}

        {subNavigation2.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
              className={`${
                item.href == pathname && 'bg-sky-100 text-sky-500'
              } hover:bg-sky-100 px-3 py-2 rounded-full`}
            >
              <div className="sm:hidden">
                <item.icon className="inline-block w-5 h-5 mr-2" />
              </div>
              <div className="hidden sm:block">
                <item.icon className="inline-block w-5 h-5 mr-2" />
                {item.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="col-span-5 sm:col-span-2">{children}</div>
    </div>
  );
};

export default SettingsLayout;
