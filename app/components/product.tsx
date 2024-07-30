'use client';

import React from 'react';
import { useCart } from './CartContext';
import Image from 'next/image';

interface ProductProps {
  product: Product;
}

const jpy = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});

const Product: React.FC<ProductProps> = ({ product }) => {
  const { addToCart, cart } = useCart();

  const isProductInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      {/* <p className="text-gray-400">${product.price.toFixed(2)}</p> */}
      <p className="text-gray-400">{jpy.format(product.price)}</p>
      <Image
        src="/tenshin_gyoza2.jpg"
        alt="An example image"
        width={350}
        height={250}
        className=""
      />
      <button
        onClick={() => addToCart(product)}
        disabled={isProductInCart}
        className={`mt-2 px-4 py-2 ${
          isProductInCart
            ? 'bg-gray-400 text-gray-600 text-sm cursor-not-allowed'
            : 'bg-blue-500 text-white text-sm hover:bg-blue-600'
        } rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {isProductInCart ? 'カートに追加済' : 'カートに入れる'}
      </button>
    </div>
  );
};

export default Product;
