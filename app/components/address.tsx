'use client';

import { useState } from 'react';
import axios from 'axios';

const Address = () => {
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState({
    prefecture: '',
    city: '',
    town: '',
  });

  const handlePostalCodeChange = async (e: { target: { value: any } }) => {
    const code = e.target.value;
    setPostalCode(code);

    if (code.length === 7) {
      try {
        const response = await axios.get(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`,
        );
        const data = response.data.results[0];
        setAddress({
          prefecture: data.address1,
          city: data.address2,
          town: data.address3,
        });
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress({
          prefecture: '',
          city: '',
          town: '',
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="postalCode">
            郵便番号
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={handlePostalCodeChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="例: 1000001"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="prefecture">
            都道府県
          </label>
          <input
            type="text"
            id="prefecture"
            value={address.prefecture}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="city">
            市区町村
          </label>
          <input
            type="text"
            id="city"
            value={address.city}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="town">
            町域
          </label>
          <input
            type="text"
            id="town"
            value={address.town}
            className="w-full p-2 border border-gray-300 rounded"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="ad1">
            住所1
          </label>
          <input
            type="text"
            id="ad1"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="ad2">
            住所2
          </label>
          <input
            type="text"
            id="ad2"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default Address;
