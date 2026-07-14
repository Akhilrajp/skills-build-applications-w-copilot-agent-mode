import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">OctoFit Tracker</a>
          <div className="navbar-nav ms-auto flex-row gap-2 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section className="row align-items-center g-4">
                <div className="col-lg-7">
                  <span className="badge bg-primary-subtle text-primary-emphasis mb-3">OctoFit Tracker</span>
                  <h1 className="display-5 fw-bold">Modern fitness tracking for ambitious teams.</h1>
                  <p className="lead text-muted">
                    Log activities, form teams, and stay motivated with a polished multi-tier experience.
                  </p>
                  <div className="d-flex gap-3">
                    <NavLink className="btn btn-primary btn-lg" to="/activities">Explore dashboard</NavLink>
                    <NavLink className="btn btn-outline-secondary btn-lg" to="/workouts">View workouts</NavLink>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                      <h2 className="h4 mb-3">What’s included</h2>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0">Activity logging</li>
                        <li className="list-group-item px-0">Team management</li>
                        <li className="list-group-item px-0">Leaderboard insights</li>
                        <li className="list-group-item px-0">Personalized workout suggestions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
