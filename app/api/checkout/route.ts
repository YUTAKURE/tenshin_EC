import { error } from 'console';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true,
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  const { products } = await request.json();
  const data: Product[] = products;

  let activeProducts = await getActiveProducts();

  try {
    for (const product of data) {
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase(),
      );

      if (stripeProduct == undefined) {
        const prod = await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount: product.price,
            currency: 'jpy',
          },
        });
      }
    }
  } catch (error) {
    console.error('Error in creating a new product', error);
    throw error;
  }

  activeProducts = await getActiveProducts();
  let stripeItems: any = [];

  for (const product of data) {
    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.toLowerCase() == product?.name?.toLowerCase(),
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct?.default_price,
        quantity: product?.quantity,
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: 'payment',
    // success_url: 'http://localhost:3000/success',
    // cancel_url: 'http://localhost:3000/cancel',
    success_url: process.env.NEXT_PUBLIC_SUCCESS_URL,
    cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL,
  });

  return NextResponse.json({ url: session.url });
};
