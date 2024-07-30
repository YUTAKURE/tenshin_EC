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
const Order = () => {
  return (
    <div>
      <div className="text-center font-bold text-xl mb-10">注文ページ</div>

      <div className="w-2/3 mx-auto">
        {/* className="grid grid-cols-2 gap-4" */}
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      <div>
        <Cart />
      </div>
    </div>
  );
};

export default Order;
