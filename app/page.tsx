import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import GoogleMap from './components/map';
import Image from 'next/image';

const Home = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールの取得
  let profile = null;

  if (session) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    profile = currentProfile;
  }

  return (
    <div className="text-center">
      <div className="mb-10">
        {session ? (
          <div>
            <div className="text-sm text-slate-700 dark:text-slate-50">
              {profile?.name} 様
            </div>
          </div>
        ) : (
          <div className="text-sm text-slate-700 dark:text-slate-50">
            ゲスト 様
          </div>
        )}
      </div>

      <div className="mb-10 mt-20 w-5/6 md:w-11/12 mx-auto">
        <h1 className="text-xl text-slate-700 dark:text-slate-50 font-light mb-5 inline-block border-b border-red-400 dark:border-yellow-300">
          ご挨拶
        </h1>
        <p className="text-sm md:text-base text-slate-700 dark:text-slate-50 font-extralight leading-relaxed mb-10">
          中華天心のギョウザ販売サイトです。
          以前は株式会社DD様の多大なるご協力により、多くの方に当店のギョウザをお届けすることができました。
          この度、オンライン注文受付及びカード決済に対応いたしましたので、よりお気軽に天心のギョウザをお楽しみいただけるようになりました。
        </p>

        <h1 className="text-xl text-slate-700 dark:text-slate-50 font-light mb-5 inline-block border-b border-red-400 dark:border-yellow-300">
          ご利用方法
        </h1>
        <p className="text-sm md:text-base text-slate-700 dark:text-slate-50 font-extralight leading-relaxed mb-5">
          大変お手数をおかけいたしますが、新規登録からお客様情報をご登録の上、
          ログイン後の会員メニュー内からご注文をお願いいたします。
          クール便での発送となります。&#40;国内のみ&#41;
        </p>
        <p className="text-sm md:text-base text-slate-700 dark:text-slate-50 font-extralight leading-relaxed">
          どうぞよろしくお願い申し上げます。
        </p>
      </div>

      {/* <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <Cart />
      </div> */}

      <div className=" md:hidden">
        <div className=" w-11/12 mx-auto mt-20">
          <h2 className=" font-light mx-auto">#天心のギョウザ</h2>
          <div>
            <p>25個入 ¥3,600</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-11/12 mx-auto mt-6">
          <Image
            src="/tenshin_gyoza2.jpg"
            alt="An example image"
            width={350}
            height={250}
            className=" rounded-3xl opacity-60 dark:opacity-70"
          />
          <Image
            src="/tenshin_gyoza1.jpg"
            alt="An example image"
            width={350}
            height={250}
            className=" rounded-3xl opacity-60 dark:opacity-70 mt-2"
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex place-items-center w-11/12 mx-auto mt-20">
          <h2 className=" font-light mx-auto">#天心のギョウザ</h2>
          <Image
            src="/tenshin_gyoza2.jpg"
            alt="An example image"
            width={350}
            height={250}
            className=" rounded-3xl opacity-60 dark:opacity-70"
          />
        </div>
        <div className="flex place-items-center w-11/12 mx-auto md:-mt-2 ">
          <Image
            src="/tenshin_gyoza1.jpg"
            alt="An example image"
            width={350}
            height={250}
            className=" rounded-3xl opacity-60 dark:opacity-70"
          />
          <div className="font-light mx-auto">
            <p>25個入 ¥3,600</p>
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        <GoogleMap />
      </div>
    </div>
  );
};

export default Home;
