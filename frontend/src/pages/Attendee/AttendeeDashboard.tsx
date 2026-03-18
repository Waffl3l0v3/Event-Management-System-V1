import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

export default function AttendeeDashboard() {
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/registrations/my-registrations");
        if (res.ok) {
          const data = await res.json();
          // Render the 3 most recently registered events on the dashboard
          setUpcomingEvents(data.events?.slice(0, 3) || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full p-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="container mx-auto animate-fade-in space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-base-content">
            Welcome back, <span className="text-primary">{user?.username || user?.name || "Attendee"}</span>!
          </h1>
          <p className="text-base-content/70 mt-2">Here is what's happening with your events today.</p>
        </div>
        <Link to="/explore" className="btn btn-primary shrink-0 shadow-md hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Discover New Events
        </Link>
      </div>

      {/* Top Stats Overview */}
      <div className="stats shadow-sm border border-base-200 w-full bg-base-100 flex flex-col md:flex-row rounded-2xl">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div className="stat-title font-medium">Upcoming Events</div>
          <div className="stat-value text-primary">2</div>
          <div className="stat-desc">Next one in 4 days</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          <div className="stat-title font-medium">Saved Events</div>
          <div className="stat-value text-secondary">12</div>
          <div className="stat-desc text-success">↗︎ 3 added this week</div>
        </div>
        
        <div className="stat">
          <div className="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <div className="stat-title font-medium">Following</div>
          <div className="stat-value text-accent">5</div>
          <div className="stat-desc">Organizers</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upcoming Registered Events */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Upcoming Events</h2>
            <Link to="/my-registrations" className="text-primary hover:text-primary-focus hover:underline text-sm font-medium">View All History</Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event._id} className="card sm:card-side bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow overflow-hidden">
                  <figure className="sm:w-56 shrink-0 relative">
                    <img src={event.coverImg || `https://placehold.co/600x400/2a323c/ffffff?text=${encodeURIComponent(event.title)}`} alt={event.title} className="w-full h-48 sm:h-full object-cover" />
                    <div className="absolute top-2 left-2 badge badge-primary badge-sm">Registered</div>
                  </figure>
                  <div className="card-body p-5 sm:p-6">
                    <h3 className="card-title text-xl mb-1">{event.title}</h3>
                    <div className="flex flex-col gap-2 text-sm text-base-content/70 mt-2">
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {event.location}
                      </span>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link to={`/event/${event._id}`} className="btn btn-sm btn-outline">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-base-100 p-10 rounded-2xl border border-base-200 text-center shadow-sm">
              <div className="text-4xl mb-4">🎫</div>
              <h3 className="text-lg font-bold mb-2">No upcoming events</h3>
              <p className="text-base-content/60 mb-6">You haven't registered for any events yet. Find something exciting to do!</p>
              <Link to="/explore" className="btn btn-primary">Explore Events</Link>
            </div>
          )}
        </div>

        {/* Right Column: Quick Links & Actions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <Link to="/saved-events" className="card bg-base-100 border border-base-200 hover:border-secondary hover:shadow-md transition-all cursor-pointer group">
              <div className="card-body p-4 flex-row items-center gap-4">
                <div className="avatar placeholder">
                  <div className="bg-secondary/10 text-secondary rounded-xl w-12 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base-content group-hover:text-secondary transition-colors">Saved Events</h3>
                  <p className="text-xs text-base-content/60">View your bookmarks</p>
                </div>
              </div>
            </Link>

            <Link to="/following" className="card bg-base-100 border border-base-200 hover:border-accent hover:shadow-md transition-all cursor-pointer group">
              <div className="card-body p-4 flex-row items-center gap-4">
                <div className="avatar placeholder">
                  <div className="bg-accent/10 text-accent rounded-xl w-12 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-content transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base-content group-hover:text-accent transition-colors">Following</h3>
                  <p className="text-xs text-base-content/60">Organizers you follow</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}