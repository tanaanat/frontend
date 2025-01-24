import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabase";
import { User } from "@supabase/supabase-js";  // SupabaseのUser型をインポート

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("ユーザー取得エラー:", error.message);
        setUser(null);
      } else if (!data?.user) {
        router.replace("/login");  // 未ログインならログインページに移動
      } else {
        setUser(data.user);
      }
    };

    fetchUser();

    // 認証状態の変更をリアルタイムで監視
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        router.replace("/login");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <ChakraProvider>
      <Component {...pageProps} user={user} setUser={setUser} />
    </ChakraProvider>
  );
}
