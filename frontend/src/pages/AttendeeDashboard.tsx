import Navbar from "../components/Navbar";

export default function AttendeeDashboard() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome, Attendee!</h1>
        <p className="mt-4">Here you can find events to attend.</p>
      </div>
    </div>
  );
}