'use client';
import React, { useState } from 'react';
import { useCart } from './CartContext';
import Loading from '../loading';

const jpy = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
});

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const handleDecrement = (productId: number) => {
    decrementQuantity(productId);

    const product = cart.find(
      (item: Product) => parseInt(item.id) === productId,
    );
    if (product && product.quantity == 0) {
      removeFromCart(productId);
    }
  };

  const checkout = async () => {
    setLoading(true);
    await fetch(
      // 'http://localhost:3000/api/checkout',
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cart }),
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.url) {
          setLoading(false);
          window.location.href = response.url;
          // console.log(response.url);
        }
      });
  };
  console.log(jpy.format(totalAmount));
  return (
    <div className="border rounded-lg p-4 shadow-md w-5/6 mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4 text-center">カート</h2>
      {cart.length === 0 ? (
        <p>カートは空です</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-gray-400">
                  {jpy.format(product.price)} x {product.quantity}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDecrement(parseInt(product.id))}
                  className="px-2 py-1 text-black border rounded-md bg-slate-100 hover:bg-slate-200"
                >
                  -
                </button>
                <button
                  onClick={() => incrementQuantity(parseInt(product.id))}
                  className="px-2 py-1 text-black border rounded-md bg-slate-100 hover:bg-slate-200"
                  disabled={product.quantity >= 3 ? true : false}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="mt-4">
            {totalAmount === 10800 && (
              <p className="text-red-500">最大3セットまで</p>
            )}
            <p className="text-lg font-semibold">
              合計: {jpy.format(totalAmount)}
            </p>
          </div>

          {loading ? (
            <div className="mt-3">
              <Loading />
            </div>
          ) : (
            <button
              onClick={checkout}
              className="mt-4 px-4 py-2 w-full bg-sky-500 hover:brightness-95 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              注文する
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;