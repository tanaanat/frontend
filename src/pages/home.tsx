import { useRouter } from "next/router";
import supabase from "../lib/supabase";

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // ログアウト後、ログインページにリダイレクト
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Valorant Account Tracker</h1>
      <p>プレイヤー情報とマッチ情報を確認できます。</p>
      <button
        onClick={handleLogout}
        style={{ padding: "10px 20px", backgroundColor: "#ff4d4f", color: "white" }}
      >
        ログアウト
      </button>
    </div>
  );
};

export default Home;
