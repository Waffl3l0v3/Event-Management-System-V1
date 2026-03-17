import Navbar from "../components/Navbar";

export default function OrganizerDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome, Organizer!</h1>
        <p className="mt-4">Here you can manage your events.</p>
      </div>
    </div>
  );
}