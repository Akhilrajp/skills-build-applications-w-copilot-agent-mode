import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge bg-primary-subtle text-primary-emphasis mb-3">
            OctoFit Tracker
          </span>
          <h1 className="display-5 fw-bold">Modern fitness tracking for ambitious teams.</h1>
          <p className="lead text-muted">
            Log activities, form teams, and stay motivated with a polished multi-tier experience.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="/">Explore dashboard</a>
            <a className="btn btn-outline-secondary btn-lg" href="/">View workouts</a>
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
    </main>
  )
}

export default App
