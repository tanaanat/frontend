import { useEffect, useState } from 'react';
import supabase from "../lib/supabase";
import { User } from '@supabase/supabase-js'; // User 型をインポート
import Link from 'next/link';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null); // User 型を適用

  useEffect(() => {
    // ユーザーのログイン状態を確認
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    checkUser();
  }, []);

  // ログアウト処理
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
      <Link href="/">ホーム</Link>
      {user ? (
        <div>
          <span>こんにちは、{user.email}</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>ログアウト</button>
        </div>
      ) : (
        <Link href="/auth">ログイン</Link>
      )}
    </nav>
  );
};

export default Navbar;
