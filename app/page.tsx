import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/lib/database.types';
import GoogleMap from './components/map';
import Product from './components/product';
import Cart from './components/Cart';

const products: Product[] = [
  {
    id: '1',
    name: '天心のギョウザ(25個入)',
    price: 3600,
    quantity: 0,
  },
];

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
    <div className="text-center text-xl ">
      {session ? <div>{profile?.name} 様</div> : <div>未ログイン</div>}

      <div className="flex flex-col gap-8">
        <h1 className="text-3xl">商品</h1>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Cart />
      </div>

      <div>
        <GoogleMap />
      </div>
    </div>
  );
};

export default Home;
