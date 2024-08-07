'use client';
import React, { useEffect, useState } from 'react';
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
  const [shippingRegion, setShippingRegion] = useState<ShippingRegion>('kanto');
  const [shippingCost, setShippingCost] = useState(0);
  const [totalShippingCost, setTotalShippingCost] = useState(0);

  const shippingRates: Record<ShippingRegion, number> = {
    hokkaido: 1890, // 北海道
    kitatohoku: 1460, // 北東北
    minamitohoku: 1340, // 南東北
    hokushinetsu: 1340, // 北信越
    kanto: 1210, // 関東
    chubu: 1210, // 中部
    kinki: 1210, // 近畿
    chugoku: 1340, // 中国
    shikoku: 1340, // 四国
    kyushu: 1460, // 九州
    okinawa: 1730, // 沖縄
  };
  const getTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const quantity = getTotalQuantity();

  useEffect(() => {
    // 選択された地域に基づいて送料を設定
    setShippingCost(shippingRates[shippingRegion]);
  }, [shippingRegion]);

  useEffect(() => {
    let extraCost = 0;
    if (quantity === 2) {
      extraCost = 340;
    } else if (quantity === 3) {
      extraCost = 750;
    }

    setTotalShippingCost(shippingCost + extraCost);
  }, [shippingCost, cart]);

  const totalAmount =
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ) + totalShippingCost;

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
    let aaa = getTotalQuantity();

    setLoading(true);
    await fetch(
      // 'http://localhost:3000/api/checkout',
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cart, shippingRegion, aaa }),
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
                {product.quantity >= 3 && (
                  <p className="text-red-500">最大3セットまで</p>
                )}
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
          <div className="inline-block">
            <select
              className="bg-slate-100 rounded-md dark:text-primary-dark"
              value={shippingRegion}
              onChange={(e) =>
                setShippingRegion(e.target.value as ShippingRegion)
              }
            >
              <option value="hokkaido">北海道</option>
              <option value="kitatohoku">北東北</option>
              <option value="minamitohoku">南東北</option>
              <option value="hokushinetsu">北信越</option>
              <option value="kanto">関東</option>
              <option value="chubu">中部</option>
              <option value="kinki">近畿</option>
              <option value="chugoku">中国</option>
              <option value="shikoku">四国</option>
              <option value="kyushu">九州</option>
              <option value="okinawa">沖縄</option>
            </select>
          </div>
          {quantity == 1 && (
            <p className="inline-block ml-5">送料: ¥{shippingCost}</p>
          )}
          {quantity == 2 && (
            <p className="inline-block ml-5">送料: ¥{shippingCost + 340}</p>
          )}
          {quantity == 3 && (
            <p className="inline-block ml-5">送料: ¥{shippingCost + 750}</p>
          )}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <div className="mt-4">
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
              className="font-bold text-sm mt-4 px-4 py-2 w-full bg-sky-500 hover:brightness-95 rounded-full p-2 text-white focus:outline-none"
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
