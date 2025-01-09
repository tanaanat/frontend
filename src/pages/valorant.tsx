import axios from 'axios';
const fetchRiotAccount = async (gameName: string, tagLine: string) => {
	try {
	  const response = await axios.post('/api/riot/account', { gameName, tagLine });
	  return response.data;
	} catch (error) {
	  console.error('Failed to fetch Riot account:', error);
	  return null;
	}
  };
  
  const fetchMatchHistory = async (puuid: string) => {
	try {
	  const response = await axios.get(`/api/riot/matches/${puuid}`);
	  return response.data;
	} catch (error) {
	  console.error('Failed to fetch match history:', error);
	  return null;
	}
  };
  
  // ボタンを作成してプレイヤー情報を取得
  const handleFetchRiotData = async () => {
	const account = await fetchRiotAccount('PlayerName', '1234');
	if (account) {
	  const matchHistory = await fetchMatchHistory(account.puuid);
	  console.log(matchHistory);
	}
  };