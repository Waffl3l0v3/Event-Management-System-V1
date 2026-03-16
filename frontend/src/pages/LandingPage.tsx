import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-24">
        <h1 className="text-4xl font-bold mb-4">Event Management System</h1>
        <p className="text-gray-500">Create and manage events easily</p>
      </div>
    </>
  );
}