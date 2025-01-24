import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      {/* 大きく太字の題名 */}
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
        Valorantについてのサイトです。
      </h1>

      {/* 説明文 */}
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        ゲーム名とタグラインでプレイヤー情報を取得できます。
        <br />
        将来的に試合履歴の表示も予定しています。
      </p>

      {/* プレイヤー情報を取得ボタン */}
      <Link href="/tracker" passHref legacyBehavior>
        <a
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          プレイヤー情報を取得
        </a>
      </Link>

      {/* 今後追加するコンテンツ（マップやキャラクターなど）の説明 */}
      <div style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>今後の予定</h2>
        <p style={{ fontSize: '18px' }}>ここにマップやキャラクターのページを追加する予定です。</p>

        {/* ダミーのボタン（将来用） */}
        <div style={{ marginTop: '20px' }}>
          <button
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            マップ情報
          </button>

          <button
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
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
