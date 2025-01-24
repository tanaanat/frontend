import { useState } from "react";
import supabase from "../lib/supabase"; // supabase設定ファイルをインポート

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");  // エラーメッセージをリセット

    // Supabaseにログインリクエスト
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("ログインに失敗しました。メールアドレスまたはパスワードが間違っています。");
    } else {
      window.location.href = "/";  // ログイン成功時にホームページへリダイレクト
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>ログインページ</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        Supabaseで登録したメールアドレスとパスワードを使用してください。
      </p>
      <form onSubmit={handleLogin} style={{ display: "inline-block", textAlign: "left" }}>
        <div style={{ marginBottom: "20px" }}>
          <label>メールアドレス:</label>
          <input
            type="email"
            placeholder="例: example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "10px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label>パスワード:</label>
          <input
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "10px", width: "100%" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px 20px", fontSize: "18px", backgroundColor: "#0070f3", color: "white" }}>
          ログイン
        </button>
      </form>
    </div>
  );
};

export default Login;

