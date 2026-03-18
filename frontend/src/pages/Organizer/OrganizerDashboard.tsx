import { Link } from "react-router-dom";

export default function OrganizerDashboard() {
  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-6 text-primary">
        Welcome, Organizer!
      </h1>
      <p className="text-lg mb-8">Manage your events and track performance.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="card-title">My Events</h2>
            <p>View and manage your created events.</p>
            <div className="card-actions justify-end">
              <Link to="/my-events" className="btn btn-primary hover:scale-105 transition-transform duration-200">
                Manage
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="card-title">Create Event</h2>
            <p>Add a new event to your portfolio.</p>
            <div className="card-actions justify-end">
              <Link to="/create-event" className="btn btn-secondary hover:scale-105 transition-transform duration-200">
                Create
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="card-body">
            <h2 className="card-title">Analytics</h2>
            <p>Check registration stats and revenue.</p>
            <div className="card-actions justify-end">
              <Link to="/analytics" className="btn btn-accent hover:scale-105 transition-transform duration-200">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
