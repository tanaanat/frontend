import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import supabase from "../lib/supabase";
import { User } from "@supabase/supabase-js";

const Home: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);  // 型を明示的に指定

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.replace("/login");  // すぐにログインページへリダイレクト
      } else {
        setUser(data.user);
      }
      setLoading(false);  // ロード終了
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("ログアウトに失敗しました:", error.message);
    } else {
      console.log("ログアウトに成功しました");
      router.replace("/login");  // ログアウト後に確実にリダイレクト
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px", fontSize: "24px", fontWeight: "bold" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", textAlign: "center", position: "relative" }}>
      {/* ログアウトボタン（右上に配置） */}
      <div style={{ position: "absolute", top: "20px", right: "30px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            backgroundColor: "#ff4d4f",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </div>

      {/* 大きく太字の題名 */}
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        Valorantについてのサイトです。
      </h1>

      {/* ユーザー情報表示 */}
      {user && (
        <p style={{ fontSize: "18px", color: "green" }}>
          ようこそ、<strong>{user.email}</strong> さん！
        </p>
      )}

      {/* 説明文 */}
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        ゲーム名とタグラインでプレイヤー情報を取得できます。
        <br />
        将来的に試合履歴の表示も予定しています。
      </p>

      {/* プレイヤー情報を取得ボタン */}
      <Link href="/tracker" passHref legacyBehavior>
        <a
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          プレイヤー情報を取得
        </a>
      </Link>

      {/* 今後の予定セクション */}
      <div style={{ marginTop: "50px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>今後の予定</h2>
        <p style={{ fontSize: "18px" }}>ここにマップやキャラクターのページを追加する予定です。</p>

        {/* マップとキャラクター情報のボタン */}
        <div style={{ marginTop: "20px" }}>
          <button
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            マップ情報
          </button>

          <button
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            キャラクター情報
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
