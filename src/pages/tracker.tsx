import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Tracker: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [puuid, setPuuid] = useState(''); //const [puuid, setPuuid] = useState('');
  const [accountData, setAccountData] = useState<{ puuid: string; gameName: string; tagLine: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // プレイヤー情報取得
  const fetchPlayerInfo = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/riot/account`, {
        gameName,
        tagLine,
      },{ withCredentials: true });
      console.log('Player Info:', response.data);
      setPuuid(response.data.puuid);  // PUUIDを保存
      setAccountData(response.data);  // プレイヤー情報を保存
      setErrorMessage('');            // エラーメッセージをリセット
    } catch (error) {
      console.error('Failed to fetch player info:', error);
      setErrorMessage('プレイヤー情報の取得に失敗しました。');
    }
  };

  // 試合履歴取得（API制限により未実装）
  const fetchMatchHistory = async () => {
    if (!puuid) {
      alert('PUUIDが取得されていません。プレイヤー情報を先に取得してください。');
      return;
    }
    alert(`試合情報（PUUID: ${puuid}）は現在取得できません。Riot APIの権限が不足しています。`);
  };


 
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>プレイヤー情報とマッチ情報</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="ゲーム名 (Game Name)"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          style={{ marginRight: '10px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="タグライン (Tag Line)"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          style={{ marginRight: '10px', padding: '10px', fontSize: '16px' }}
        />
        <button
          onClick={fetchPlayerInfo}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          プレイヤー情報を取得
        </button>
      </div>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

      {accountData && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>プレイヤー情報:</h2>
          <p><strong>PUUID:</strong> {accountData.puuid}</p>
          <p><strong>ゲーム名:</strong> {accountData.gameName}</p>
          <p><strong>タグライン:</strong> {accountData.tagLine}</p>
        </div>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={fetchMatchHistory}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            backgroundColor: 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          試合情報を取得
        </button>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/" passHref legacyBehavior>
          <a
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            ホームに戻る
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Tracker;