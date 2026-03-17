import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import Context
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import AttendeeDashboard from "./pages/Attendee/AttendeeDashboard";
import OrganizerDashboard from "./pages/Organizer/OrganizerDashboard";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetails from "./pages/EventDetails";
import EditEvent from "./pages/EditEvent";

// Placeholder components for new pages
const MyRegistrations = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">My Registrations</h1>
    <p>View your registered and waitlisted events.</p>
  </div>
);
const SavedEvents = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">Saved Events</h1>
    <p>Your bookmarked events.</p>
  </div>
);
const FollowingOrganizers = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">Following Organizers</h1>
    <p>Organizers you follow.</p>
  </div>
);
const Notifications = () => (
  <div className="container mx-auto p-8 animate-fade-in">
    <h1 className="text-3xl font-bold mb-6">Notifications</h1>
    <p>Event updates, registrations, comments.</p>
  </div>
);
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
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

// 🔒 New Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  // 1. MUST WAIT FOR BACKEND TO RESPOND
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 2. ONLY REDIRECT IF WE ARE SURE THERE IS NO USER
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 3. RENDER THE SECURE PAGE
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
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <LandingPage />
          </Layout>
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
