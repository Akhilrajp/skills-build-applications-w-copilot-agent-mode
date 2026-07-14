import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Unable to fetch leaderboard');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ol className="list-group list-group-numbered">
          {items.map((item) => (
            <li key={item._id || item.id} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <strong>{item.name}</strong>
                <div className="text-muted">{item.team}</div>
              </div>
              <span className="badge bg-primary rounded-pill">{item.score}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Leaderboard;
