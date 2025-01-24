import React, { useState } from 'react';
import axios from 'axios';

// 明示的に型を定義
type Match = {
    matchId: string;
    map: string;
    gameMode: string;
    score: number;
    kills: number;
    deaths: number;
    assists: number;
};

console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

const Home = () => {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [comment, setComment] = useState('');
    const [matchId, setMatchId] = useState('');
    const [matchHistory, setMatchHistory] = useState<Match[]>([]); // 型をしっかり指定

    const fetchRiotAccount = async () => {
        try {
            const response = await axios.post('${process.env.NEXT_PUBLIC_API_URL}/riot/account', {
                gameName, tagLine
            });
            console.log('Riot Account:', response.data);
        } catch (error) {
            console.error('Failed to fetch Riot account:', error);
        }
    };

    const fetchMatchHistory = async () => {
        try {
            const response = await axios.get<{ history: Match[] }>(`${process.env.NEXT_PUBLIC_API_URL}/riot/matches/${gameName}`);
            // 型を明示的に指定し、正しいデータ構造を期待
            setMatchHistory(response.data.history);
        } catch (error) {
            console.error('Failed to fetch match history:', error);
        }
    };

    const addComment = async () => {
        try {
            await axios.post('${process.env.NEXT_PUBLIC_API_URL}/match/comment', { match_id: matchId, comment });
            alert('Comment added successfully!');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    return (
        <div>
            <h1>Valorant Match Tracker</h1>

            <input type="text" placeholder="Game Name" value={gameName} onChange={(e) => setGameName(e.target.value)} />
            <input type="text" placeholder="Tag Line" value={tagLine} onChange={(e) => setTagLine(e.target.value)} />
            <button onClick={fetchRiotAccount}>Fetch Riot Account</button>
            
            <button onClick={fetchMatchHistory}>Fetch Match History</button>

            {/* ここで型を明示してエラーを解消 */}
            <ul>
                {matchHistory.length > 0 && matchHistory.map((match, index) => (
                    <li key={index}>{match.matchId}</li>
                ))}
            </ul>

            <input type="text" placeholder="Match ID" value={matchId} onChange={(e) => setMatchId(e.target.value)} />
            <input type="text" placeholder="Add Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={addComment}>Add Comment</button>
        </div>
    );
};

export default Home;
