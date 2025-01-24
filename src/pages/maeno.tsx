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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Valorant Stats Tracker</h1>

      {/* フォーム */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
        <label>
          Map:
          <input name="map" value={formData.map} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Character:
          <input name="character" value={formData.character} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          ACS:
          <input name="acs" type="number" value={formData.acs} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Kills:
          <input name="kills" type="number" value={formData.kills} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Deaths:
          <input name="deaths" type="number" value={formData.deaths} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Assists:
          <input name="assists" type="number" value={formData.assists} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Headshot %:
          <input name="headshotPercentage" type="number" value={formData.headshotPercentage} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          First Kills:
          <input name="firstKills" type="number" value={formData.firstKills} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          First Deaths:
          <input name="firstDeaths" type="number" value={formData.firstDeaths} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Multi Kills:
          <input name="multiKills" type="number" value={formData.multiKills} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
        </label>
        <label>
          Memo:
          <textarea name="memo" value={formData.memo} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
        </label>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add Stat
        </button>
      </form>
      {/* テーブル */}
      <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Map</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Character</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>ACS</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>K/D/A</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>HS%</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>FK/FD</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Multi Kills</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Memo</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat) => (
            <tr key={stat.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{stat.map}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{stat.character}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{stat.acs}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${stat.kills}/${stat.deaths}/${stat.assists}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{stat.headshotPercentage}%</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{`${stat.firstKills}/${stat.firstDeaths}`}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{stat.multiKills}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{stat.memo}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => handleDelete(stat.id)} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
