interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

type Product = {
  name: string;
  price: number;
  quantity: number;
};

type ShippingRates = {
  [key in ShippingRegion]: number;
};

type ShippingRegion =
  | 'hokkaido'
  | 'kitatohoku'
  | 'minamitohoku'
  | 'hokushinetsu'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu'
  | 'okinawa';

type LineItem = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
};
