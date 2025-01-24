import { useState } from 'react';
import supabase from "../lib/supabase";
import { useRouter } from 'next/router';

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // ログイン処理
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMessage('ログインに失敗しました。');
    } else {
      router.push('/tracker'); // ログイン後にトラッカーページへリダイレクト
    }
  };

  // サインアップ処理
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMessage('サインアップに失敗しました。');
    } else {
      alert('サインアップ成功！メールを確認してください。');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>ログイン / サインアップ</h1>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', margin: '5px' }}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', margin: '5px' }}
      />
      <div>
        <button onClick={handleLogin} style={{ padding: '10px 20px', margin: '5px', background: 'blue', color: 'white' }}>
          ログイン
        </button>
        <button onClick={handleSignUp} style={{ padding: '10px 20px', margin: '5px', background: 'green', color: 'white' }}>
          サインアップ
        </button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Auth;
