import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(getApiUrl('workouts'));
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <div className="row g-3">
          {items.map((item) => (
            <div key={item._id || item.id} className="col-md-6">
              <div className="border rounded p-3 h-100">
                <h3 className="h6 mb-2">{item.name}</h3>
                <p className="mb-2 text-muted">{item.description}</p>
                <span className="badge bg-secondary">{item.durationMinutes} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workouts;
