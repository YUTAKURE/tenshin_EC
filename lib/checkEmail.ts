import type { Database } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export async function checkEmail(email: string): Promise<boolean> {
  const supabase = createClientComponentClient<Database>();

  const { data, error } = await supabase
    .from('profiles') // 'users'はユーザーテーブルの名前
    .select('email')
    .eq('email', email);

  if (error) {
    throw new Error(error.message);
  }

  return data.length > 0;
}
