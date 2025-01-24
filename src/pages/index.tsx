import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [puuid, setPuuid] = useState('');
  const [matches, setMatches] = useState([]);

  // プレイヤー情報取得
  const fetchPlayerInfo = async () => {
    try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/riot/account`, {
        gameName,
        tagLine,
      });

      console.log('Player Info:', response.data);
      setPuuid(response.data.puuid); // PUUIDを保存
	  console.log('PUUID:', response.data.puuid); // 取得したPUUIDをログに出力
    } catch (error) {
      console.error('Failed to fetch player info:', error);
    }
  };

  // 試合履歴取得
  const fetchMatchHistory = async () => {
    if (!puuid) {
      alert('PUUIDが取得されていません。プレイヤー情報を先に取得してください。');
      return;
    }
    try {
      const response = await axios.get(`http://127.0.0.1:8000/riot/matches/${puuid}`);
      console.log('Match History:', response.data);
      setMatches(response.data.history); // 試合履歴を保存
    } catch (error) {
      console.error('Failed to fetch match history:', error);
    }
  };

  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Valorant Stats Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag Line"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
        />
        <button onClick={fetchPlayerInfo}>Fetch Player Info</button>
      </div>
      <div>
        <button onClick={fetchMatchHistory}>Fetch Match History</button>
        <ul>
          {matches && matches.length > 0 ? (
            matches.map((match, index) => (
              <li key={index}>{JSON.stringify(match)}</li>
            ))
          ) : (
            <li>No match history available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
