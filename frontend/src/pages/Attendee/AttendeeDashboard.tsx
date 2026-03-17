export default function AttendeeDashboard() {
  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-primary">
        Welcome, Attendee!
      </h1>
      <p className="text-lg mb-8">Discover and register for amazing events.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="card-title">Explore Events</h2>
            <p>Browse upcoming events in your area.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary hover:scale-105 transition-transform duration-200">
                Explore
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="card-title">My Registrations</h2>
            <p>View your registered events.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary hover:scale-105 transition-transform duration-200">
                View
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="card-title">Saved Events</h2>
            <p>Your bookmarked events.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-accent hover:scale-105 transition-transform duration-200">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
