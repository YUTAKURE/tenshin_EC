'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { UseFormRegister } from 'react-hook-form';

interface AddressProps {
  register: UseFormRegister<any>;
  setAddress: (address: {
    prefecture: string;
    city: string;
    town: string;
  }) => void;
}

const Address: React.FC<AddressProps> = ({ register, setAddress }) => {
  const [postalCode, setPostalCode] = useState('');
  const [localAddress, setLocalAddress] = useState({
    prefecture: '',
    city: '',
    town: '',
  });
  const [error, setError] = useState('');

  const handlePostalCodeChange = async (e: { target: { value: string } }) => {
    let code = e.target.value.replace(/-/g, ''); // ハイフンを削除
    setPostalCode(code);

    if (code.length === 7) {
      setError(''); // エラーをクリア
      try {
        const response = await axios.get(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`,
        );
        const data = response.data.results[0];
        const updatedAddress = {
          prefecture: data.address1,
          city: data.address2,
          town: data.address3,
        };
        setLocalAddress(updatedAddress);
        setAddress(updatedAddress); // Profileコンポーネントに渡す
      } catch (error) {
        console.error('Error fetching address:', error);
        setLocalAddress({
          prefecture: '',
          city: '',
          town: '',
        });
        setAddress({
          prefecture: '',
          city: '',
          town: '',
        });
      }
    } else if (code.length > 7) {
      setError('郵便番号は7桁で入力してください。');
    } else {
      setError(''); // エラーをクリア
      setLocalAddress({
        prefecture: '',
        city: '',
        town: '',
      });
      setAddress({
        prefecture: '',
        city: '',
        town: '',
      });
    }
  };

  const handleTownChange = (e: { target: { value: string } }) => {
    const town = e.target.value;
    const updatedAddress = { ...localAddress, town };
    setLocalAddress(updatedAddress);
    setAddress(updatedAddress);
  };

  return (
    <div className="text-sm">
      <div className="mb-4">
        <label className="block mb-1 font-bold" htmlFor="postalCode">
          郵便番号
        </label>
        <input
          type="text"
          id="postalCode"
          {...register('postal_code')}
          value={postalCode}
          onChange={handlePostalCodeChange}
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
          placeholder="例: 123-4567 または 1234567"
        />
        {error && <div className="text-red-500 mt-1">{error}</div>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold" htmlFor="prefecture">
          都道府県<span className="text-xxs ml-2">(自動入力)</span>
        </label>
        <input
          type="text"
          id="prefecture"
          {...register('prefecture')}
          value={localAddress.prefecture}
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold" htmlFor="city">
          市区町村<span className="text-xxs ml-2">(自動入力)</span>
        </label>
        <input
          type="text"
          id="city"
          {...register('city')}
          value={localAddress.city}
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold" htmlFor="town">
          町域･番地<span className="text-xxs ml-2">(自動入力)</span>
        </label>
        <input
          type="text"
          id="town"
          {...register('town')}
          value={localAddress.town}
          onChange={handleTownChange}
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-bold" htmlFor="building">
          建物名･部屋番号など
        </label>
        <input
          type="text"
          id="building"
          {...register('building')}
          className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
        />
      </div>
    </div>
  );
};

export default Address;
