import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventDetails() {
  const { id } = useParams();
  const [event] = useState({
    title: "Sample Event",
    description: "Event description",
    date: "2023-12-01",
    location: "Venue",
    organizer: "Organizer Name",
  });
  const [loading] = useState(false);

  useEffect(() => {
    // Fetch event details from API
    // For now, already set in state
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
      <p className="text-lg mb-4">{event.description}</p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
        <strong>Organizer:</strong> {event.organizer}
      </p>
      <button className="btn btn-primary mt-4 hover:scale-105 transition-transform duration-200">
        Register
      </button>
    </div>
  );
}
