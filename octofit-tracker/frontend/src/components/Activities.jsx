import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Unable to fetch activities');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {items.map((item) => (
            <li key={item._id || item.id} className="list-group-item px-0">
              <strong>{item.type}</strong> · {item.durationMinutes} min · {item.completedAt}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Activities;
