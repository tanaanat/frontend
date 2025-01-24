import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [puuid, setPuuid] = useState('');
  const [accountData, setAccountData] = useState<{ puuid: string; gameName: string; tagLine: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // プレイヤー情報取得
  const fetchPlayerInfo = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/riot/account`, {
        gameName,
        tagLine,
      });
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
    alert('試合情報は現在取得できません。Riot APIの権限が不足しています。');
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>Valorant Account Tracker</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="ゲーム名 (Game Name)"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="タグライン (Tag Line)"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={fetchPlayerInfo} style={{ padding: '5px 15px' }}>
          プレイヤー情報を取得
        </button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {accountData && (
        <div style={{ marginTop: '20px' }}>
          <h2>プレイヤー情報:</h2>
          <p><strong>PUUID:</strong> {accountData.puuid}</p>
          <p><strong>ゲーム名:</strong> {accountData.gameName}</p>
          <p><strong>タグライン:</strong> {accountData.tagLine}</p>
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchMatchHistory} style={{ padding: '5px 15px', backgroundColor: 'gray', color: 'white' }}>
          試合情報を取得
        </button>
      </div>
    </div>
  );
};
export default Home;