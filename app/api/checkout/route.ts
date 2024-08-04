import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product) => product.active === true,
  );
  return availableProducts;
};

export const POST = async (request: Request) => {
  try {
    const {
      products,
      shippingRegion,
      aaa,
    }: { products: Product[]; shippingRegion: ShippingRegion; aaa: number } =
      await request.json();
    const data: Product[] = products;

    // 日本国内の地域別送料を設定
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

    const shippingCost = shippingRates[shippingRegion] || 0;

    let activeProducts = await getActiveProducts();

    for (const product of data) {
      const stripeProduct = activeProducts.find(
        (stripeProduct) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase(),
      );

      if (!stripeProduct) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount: product.price,
            currency: 'jpy',
          },
        });
      }
    }

    activeProducts = await getActiveProducts();
    let stripeItems: LineItem[] = [];

    for (const product of data) {
      const stripeProduct = activeProducts.find(
        (prod) => prod.name.toLowerCase() === product.name.toLowerCase(),
      );

      if (stripeProduct && stripeProduct.default_price) {
        stripeItems.push({
          price_data: {
            currency: 'jpy',
            product_data: {
              name: stripeProduct.name,
            },
            unit_amount: product.price,
          },
          quantity: product.quantity,
        });
      }
    }

    // 送料を追加するロジック
    let adjustedShippingCost = shippingCost;
    if (aaa === 2) {
      adjustedShippingCost = shippingCost + 340;
    } else if (aaa === 3) {
      adjustedShippingCost = shippingCost + 750;
    }

    // 送料を追加
    stripeItems.push({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: 'Shipping Cost',
        },
        unit_amount: adjustedShippingCost,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: stripeItems,
      mode: 'payment',
      success_url: process.env.NEXT_PUBLIC_SUCCESS_URL!,
      cancel_url: process.env.NEXT_PUBLIC_CANCEL_URL!,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error in creating a new product', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 },
    );
  }
};
