'use client';

import { useCallback, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import useStore from '@/store';
import Address from './address';
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }),
  postal_code: z.string().min(0),
  phone_number: z.string().min(0),
  prefecture: z.string().min(0),
  city: z.string().min(0),
  town: z.string().min(0),
  building: z.string().min(0),
});

// プロフィール
const Profile = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  // const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  // const [fileMessage, setFileMessage] = useState('');
  // const [avatarUrl, setAvatarUrl] = useState('/default.png');
  const { user } = useStore();
  const [address, setAddress] = useState({
    prefecture: '',
    city: '',
    town: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: {
      name: user.name ? user.name : '',
      postal_code: user.postal_code ? user.postal_code : '',
      phone_number: user.phone_number ? user.phone_number : '',
      prefecture: user.prefecture ? user.prefecture : '',
      city: user.city ? user.city : '',
      town: user.town ? user.town : '',
      building: user.building ? user.building : '',
    },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // アバター画像の取得
  // useEffect(() => {
  //   if (user && user.avatar_url) {
  //     setAvatarUrl(user.avatar_url);
  //   }
  // }, [user]);

  // 画像アップロード
  // const [fileName, setFileName] = useState('');

  // const onUploadImage = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = e.target.files;
  //     if (files) {
  //       setFileName(files[0].name);
  //     } else {
  //       setFileName('');
  //     }

  //     setFileMessage('');

  //     // ファイルが選択されていない場合
  //     if (!files || files?.length == 0) {
  //       setFileMessage('画像をアップロードしてください。');
  //       return;
  //     }

  //     const fileSize = files[0]?.size / 1024 / 1024; // size in MB
  //     const fileType = files[0]?.type; // MIME type of the file

  //     // 画像サイズが2MBを超える場合
  //     if (fileSize > 2) {
  //       setFileMessage('画像サイズを2MB以下にする必要があります。');
  //       return;
  //     }

  //     // ファイル形式がjpgまたはpngでない場合
  //     if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
  //       setFileMessage('画像はjpgまたはpng形式である必要があります。');
  //       return;
  //     }

  //     // 画像をセット
  //     setAvatar(files[0]);
  //   },
  //   [],
  // );

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('profiles')
          // .select('name, postal_code, phone_number')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          // setMessage('エラーが発生しました。' + error.message);
          // 解決すべし！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        } else if (data) {
          setAddress({
            prefecture: data.prefecture || '',
            city: data.city || '',
            town: data.town || '',
          });
          reset({
            name: data.name || '',
            postal_code: data.postal_code || '',
            phone_number: data.phone_number || '',
            prefecture: data.prefecture || '',
            city: data.city || '',
            town: data.town || '',
            building: data.building || '',
          });
        }
      } catch (error) {
        setMessage('エラーが発生しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.id, reset, supabase]);

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      // let avatar_url = user.avatar_url;

      // if (avatar) {
      //   // supabaseストレージに画像アップロード
      //   const { data: storageData, error: storageError } =
      //     await supabase.storage
      //       .from('profile')
      //       .upload(`${user.id}/${uuidv4()}`, avatar);

      //   // エラーチェック
      //   if (storageError) {
      //     setMessage('エラーが発生しました。' + storageError.message);
      //     return;
      //   }

      //   if (avatar_url) {
      //     const fileName = avatar_url.split('/').slice(-1)[0];

      //     // 古い画像を削除
      //     await supabase.storage
      //       .from('profile')
      //       .remove([`${user.id}/${fileName}`]);
      //   }

      //   // 画像のURLを取得
      //   const { data: urlData } = await supabase.storage
      //     .from('profile')
      //     .getPublicUrl(storageData.path);

      //   avatar_url = urlData.publicUrl;
      // }

      const combinedData = { ...data, ...address, id: user.id };

      console.log('Submitting data:', combinedData);

      // プロフィールアップデート
      const { error: updateError } = await supabase
        .from('profiles')
        .update(combinedData)
        .eq('id', user.id);

      // エラーチェック
      if (updateError) {
        setMessage('エラーが発生しました。' + updateError.message);
        return;
      }

      setMessage('プロフィールを更新しました。');

      // フォームのデータをリセットして更新
      reset(combinedData);
    } catch (error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="text-center font-bold text-xl">
        プロフィール
        <p className="text-[0.6rem] top-6 left-8">(お届け先情報)</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* アバター画像 */}
        <div className="">
          <div className="flex flex-col text-sm items-center justify-center">
            <div className="relative w-24 h-24">
              {/* <Image
                src={avatarUrl}
                className="rounded-full object-cover"
                alt="avatar"
                fill
              /> */}
            </div>
            {/* <label className="inline-block w-[140px] text-center px-4 py-2 text-xs bg-slate-200 text-gray-800 cursor-pointer rounded-full hover:bg-slate-300">
              <input
                type="file"
                id="avatar"
                onChange={onUploadImage}
                className=" opacity-0 w-0"
              />
              画像アップロード
            </label>
            {fileName && <p className="mt-2">{fileName}</p>}
            {fileMessage && (
              <div className="text-center text-red-500 my-5">{fileMessage}</div>
            )} */}
          </div>
        </div>

        {/* 名前 */}
        <div className="-mt-14 mb-5">
          <div className="text-sm mb-1 font-bold">名前</div>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
            placeholder="名前"
            id="name"
            {...register('name', { required: true })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.name?.message}
          </div>
        </div>

        {/* 自己紹介 */}
        {/* <div className="mb-5">
          <div className="text-sm mb-1 font-bold">自己紹介</div>
          <textarea
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500  text-primary-dark"
            placeholder="自己紹介"
            id="introduce"
            {...register('introduce')}
            rows={5}
          />
        </div> */}

        {/* 住所 */}
        <div className="mb-5">
          <Address register={register} setAddress={setAddress} />
        </div>

        {/* 電話番号 */}
        <div className="mb-5">
          <div className="text-sm mb-1 font-bold">電話番号</div>
          <input
            type="text"
            className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500 text-primary-dark"
            placeholder="電話番号"
            id="phone_number"
            {...register('phone_number', { required: true })}
            required
          />
          <div className="my-3 text-center text-sm text-red-500">
            {errors.name?.message}
          </div>
        </div>

        {/* 変更ボタン */}
        <div className="mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
            >
              変更
            </button>
          )}
        </div>
      </form>

      {/* メッセージ */}
      {message && (
        <div className="my-5 text-center text-red-500 mb-5">{message}</div>
      )}
    </div>
  );
};

export default Profile;
