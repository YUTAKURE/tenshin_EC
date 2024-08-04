'use client';

import Cart from './Cart';
import Product from './product';

const products: Product[] = [
  {
    id: '1',
    name: '天心のギョウザ(25個入)',
    price: 3600,
    quantity: 0,
  },
];

// 注文
const Special = () => {
  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">特典ページ</div>

      <div className="w-1/2 text-center mx-auto">準備中</div>
    </div>
  );
};

export default Special;
