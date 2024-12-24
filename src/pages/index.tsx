import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

type Stat = {
  id: string;
  map: string;
  character: string;
  acs: number;
  kills: number;
  deaths: number;
  assists: number;
  headshotPercentage: number;
  firstKills: number;
  firstDeaths: number;
  multiKills: number;
  memo?: string;
};

const Home: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [formData, setFormData] = useState<Omit<Stat, 'id'>>({
    map: '',
    character: '',
    acs: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    headshotPercentage: 0,
    firstKills: 0,
    firstDeaths: 0,
    multiKills: 0,
    memo: '',
  });

  // データ取得
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get<Stat[]>('/api/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  // フォーム入力の変更を処理
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // フォーム送信
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Stat>('/api/stats', formData);
      setStats([...stats, response.data]); // 新しいデータを追加
      setFormData({
        map: '',
        character: '',
        acs: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        headshotPercentage: 0,
        firstKills: 0,
        firstDeaths: 0,
        multiKills: 0,
        memo: '',
      });
    } catch (error) {
      console.error('Failed to save stat:', error);
    }
  };

  // スタッツ削除
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/stats/${id}`);
      setStats(stats.filter((stat) => stat.id !== id));
    } catch (error) {
      console.error('Failed to delete stat:', error);
    }
  };

  return (
    <div>
      <h1>Valorant Stats Tracker</h1>

      {/* フォーム */}
      <form onSubmit={handleSubmit}>
        <input name="map" placeholder="Map" value={formData.map} onChange={handleChange} required />
        <input name="character" placeholder="Character" value={formData.character} onChange={handleChange} required />
        <input name="acs" type="number" placeholder="ACS" value={formData.acs} onChange={handleChange} required />
        <input name="kills" type="number" placeholder="Kills" value={formData.kills} onChange={handleChange} required />
        <input name="deaths" type="number" placeholder="Deaths" value={formData.deaths} onChange={handleChange} required />
        <input name="assists" type="number" placeholder="Assists" value={formData.assists} onChange={handleChange} required />
        <input name="headshotPercentage" type="number" placeholder="HS%" value={formData.headshotPercentage} onChange={handleChange} required />
        <input name="firstKills" type="number" placeholder="First Kills" value={formData.firstKills} onChange={handleChange} required />
        <input name="firstDeaths" type="number" placeholder="First Deaths" value={formData.firstDeaths} onChange={handleChange} required />
        <input name="multiKills" type="number" placeholder="Multi Kills" value={formData.multiKills} onChange={handleChange} required />
        <textarea name="memo" placeholder="Memo" value={formData.memo} onChange={handleChange}></textarea>
        <button type="submit">Add Stat</button>
      </form>

      {/* スタッツ一覧 */}
      <table border={1}>
        <thead>
          <tr>
            <th>Map</th>
            <th>Character</th>
            <th>ACS</th>
            <th>K/D/A</th>
            <th>HS%</th>
            <th>FK/FD</th>
            <th>Multi Kills</th>
            <th>Memo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.map}</td>
              <td>{stat.character}</td>
              <td>{stat.acs}</td>
              <td>{`${stat.kills}/${stat.deaths}/${stat.assists}`}</td>
              <td>{stat.headshotPercentage}%</td>
              <td>{`${stat.firstKills}/${stat.firstDeaths}`}</td>
              <td>{stat.multiKills}</td>
              <td>{stat.memo}</td>
              <td>
                <button onClick={() => handleDelete(stat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
