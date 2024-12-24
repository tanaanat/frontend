let stats = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(stats);
  } else if (req.method === 'POST') {
    const newStat = { id: Date.now(), ...req.body };
    stats.push(newStat);
    res.status(201).json(newStat);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    stats = stats.filter((stat) => stat.id !== parseInt(id));
    res.status(200).json({ message: 'Deleted' });
  }
}