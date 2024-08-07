'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navigation from './navigation';
import type { Database } from '@/lib/database.types';

// 認証状態の監視
const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールの取得
  let profile = null;

  if (session) {
    const { data: currentProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return <Navigation session={session} profile={null} />;
    }

    profile = currentProfile;

    // メールアドレスを変更した場合、プロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      // プロフィール情報をアップデート
      const updatedProfileData = {
        email: session.user.email,
        name: currentProfile.name,
        postal_code: currentProfile.postal_code,
        phone_number: currentProfile.phone_number,
        prefecture: currentProfile.prefecture,
        city: currentProfile.city,
        town: currentProfile.town,
        building: currentProfile.building,
      };
      // メールアドレスを更新
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update(updatedProfileData)
        .match({ id: session.user.id })
        .select('*')
        .single();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        return <Navigation session={session} profile={profile} />;
      }

      profile = updatedProfile;
    }
  }

  return <Navigation session={session} profile={profile} />;
};

export default SupabaseListener;
