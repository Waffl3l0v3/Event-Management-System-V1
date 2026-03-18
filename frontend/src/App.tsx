import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import Context
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import AttendeeDashboard from "./pages/Attendee/AttendeeDashboard";
import OrganizerDashboard from "./pages/Organizer/OrganizerDashboard";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";

// Placeholder components for new pages
const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch("/api/registrations/my-registrations");
        if (res.ok) {
          const data = await res.json();
          setRegistrations(data.events || []);
        }
      } catch (error) {
        console.error("Failed to fetch registrations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  if (loading) return <div className="p-8 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto animate-fade-in space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-base-200 pb-4 gap-4">
        <h1 className="text-3xl font-bold text-base-content">My Registrations</h1>
        <div className="badge badge-primary badge-lg">{registrations.length} Events</div>
      </div>
      <div className="grid gap-4">
        {registrations.length > 0 ? registrations.map((event) => (
          <div key={event._id} className="card bg-base-100 shadow-sm border border-base-200 flex-col sm:flex-row items-center p-4 gap-6 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 text-primary p-4 rounded-xl flex flex-col items-center justify-center min-w-[120px] w-full sm:w-auto">
              <span className="text-sm font-bold uppercase">
                {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'TBA'}
              </span>
              <span className="text-3xl font-black">
                {event.date ? new Date(event.date).getDate() : '??'}
              </span>
            </div>
            <div className="flex-1 w-full space-y-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <span className={`badge badge-sm ${event.status === 'completed' ? 'badge-ghost' : 'badge-success'}`}>
                  {event.status || 'Upcoming'}
                </span>
              </div>
              <p className="text-sm text-base-content/70 flex items-center justify-center sm:justify-start gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {event.location}
              </p>
            </div>
            <div className="flex flex-col w-full sm:w-auto gap-2 mt-4 sm:mt-0">
              <Link to={`/event/${event._id}`} className="btn btn-outline btn-sm">View Event</Link>
            </div>
          </div>
        )) : (
          <p className="text-center py-8 text-base-content/60">No registrations found.</p>
        )}
      </div>
    </div>
  );
};

const SavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await fetch("/api/users/saved-events");
        if (res.ok) {
          const data = await res.json();
          setSavedEvents(data.savedEvents || []);
        }
      } catch (error) {
        console.error("Failed to fetch saved events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedEvents();
  }, []);

  if (loading) return <div className="p-8 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto animate-fade-in space-y-6 max-w-6xl">
      <h1 className="text-3xl font-bold text-base-content border-b border-base-200 pb-4">Saved Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedEvents.length > 0 ? savedEvents.map((event) => (
          <div key={event._id} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow group">
            <figure className="relative h-48 overflow-hidden">
              <img src={event.coverImg || `https://placehold.co/600x400/f59e0b/ffffff?text=${encodeURIComponent(event.title)}`} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </figure>
            <div className="card-body p-5">
              <h3 className="card-title text-lg">{event.title}</h3>
              <p className="text-sm text-base-content/70 font-medium">📅 {event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/event/${event._id}`} className="btn btn-primary btn-sm w-full">View Details</Link>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center py-8 col-span-full text-base-content/60">No saved events found.</p>
        )}
      </div>
    </div>
  );
};

const FollowingOrganizers = () => {
  const [organizers, setOrganizers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await fetch("/api/users/following");
        if (res.ok) {
          const data = await res.json();
          setOrganizers(data.following || []);
        }
      } catch (error) {
        console.error("Failed to fetch following organizers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowing();
  }, []);

  if (loading) return <div className="p-8 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto animate-fade-in space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-base-content border-b border-base-200 pb-4">Following Organizers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {organizers.length > 0 ? organizers.map((org) => (
          <div key={org._id} className="card bg-base-100 shadow-sm border border-base-200 p-5 flex-row items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={org.profileImg || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"} alt={org.name || org.username} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{org.name || org.username}</h3>
              <span className="text-xs font-semibold text-primary mt-1 block">{org.followers?.length || 0} Followers</span>
            </div>
          </div>
        )) : (
          <p className="text-center py-8 col-span-full text-base-content/60">You are not following any organizers.</p>
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (res.ok) {
          const data = await res.json();
          setNotifications(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <div className="p-8 text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto animate-fade-in space-y-6 max-w-3xl">
      <div className="flex justify-between items-center border-b border-base-200 pb-4">
        <h1 className="text-3xl font-bold text-base-content">Notifications</h1>
      </div>
      <div className="space-y-3">
        {notifications.length > 0 ? notifications.map((notif) => (
          <div key={notif._id} className={`p-4 rounded-xl border flex items-start gap-4 transition-colors ${notif.isRead ? 'bg-base-100 border-base-200' : 'bg-primary/5 border-primary/30 shadow-sm'}`}>
            <div className="mt-1 text-2xl flex-shrink-0">
              {notif.notificationType === 'event_update' ? '🔄' : notif.notificationType === 'comment' ? '💬' : '🎟️'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <h4 className={`text-base ${notif.isRead ? 'font-medium' : 'font-bold'}`}>
                  {notif.notificationType === 'event_update' ? 'Event Update' : notif.notificationType === 'comment' ? 'New Comment' : 'Alert'}
                </h4>
                <span className="text-xs text-base-content/50 whitespace-nowrap">
                  {new Date(notif.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-base-content/70 mt-1">{notif.message}</p>
            </div>
            {!notif.isRead && (
              <div className="w-3 h-3 rounded-full bg-primary self-center flex-shrink-0"></div>
            )}
          </div>
        )) : (
          <p className="text-center py-8 text-base-content/60">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

const MyEvents = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">My Events</h1>
    <p>List of events you created.</p>
  </div>
);
const CreateEvent = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">Create Event</h1>
    <p>Form to create a new event.</p>
  </div>
);
const Registrations = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">Registrations</h1>
    <p>View users registered for your events.</p>
  </div>
);
const Analytics = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">Analytics</h1>
    <p>Stats like registrations and revenue.</p>
  </div>
);
const EditProfile = () => (
  <div className="p-4">
    <h1>Edit Profile</h1>
    <p>Edit your profile information.</p>
  </div>
);

// Layout component with Navbar
const Layout = ({ children, noPadding = false }: { children: React.ReactNode; noPadding?: boolean }) => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-base-100">
      {/* Sidebar only renders for logged-in users */}
      {user && <Sidebar isOpen={isSidebarOpen} />}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen} 
        />
        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto ${noPadding ? "" : "p-4 md:p-8 bg-base-200"}`}>{children}</main>
      </div>
    </div>
  );
};

// 🔒 New Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // 1. ONLY REDIRECT IF WE ARE SURE THERE IS NO USER
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. RENDER THE SECURE PAGE
  return <Layout>{children}</Layout>;
};

// Role-based Homepage Router
const HomePageRouter = () => {
  const { user } = useAuth();

  if (user?.role === "organizer") {
    return <OrganizerDashboard />;
  }
  // Default to attendee dashboard
  return <AttendeeDashboard />;
};

function AppRoutes() {
  const { user, loading } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // If user is found, stop checking immediately
    if (user) {
      setIsCheckingAuth(false);
      return;
    }
    
    // Grace period for AuthContext to hydrate (e.g., from cookies or API)
    // This stops the app from flashing the landing page before redirecting to the dashboard
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [user]);

  // Block rendering routes until auth status is determined.
  // This completely stops UI flashes and mixed layouts on refresh.
  if (loading || isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          // Redirect logged-in users to their dashboard so refresh doesn't show landing content.
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <Layout noPadding={true}>
              <LandingPage />
            </Layout>
          )
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePageRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <ExploreEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-event/:id"
        element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute>
            <MyRegistrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-events"
        element={
          <ProtectedRoute>
            <SavedEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/following"
        element={
          <ProtectedRoute>
            <FollowingOrganizers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events"
        element={
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registrations"
        element={
          <ProtectedRoute>
            <Registrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
