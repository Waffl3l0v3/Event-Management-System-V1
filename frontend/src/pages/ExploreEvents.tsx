import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ExploreEvents() {
  const [events] = useState([
    {
      id: 1,
      title: "Tech Conference",
      date: "2023-12-01",
      location: "City Hall",
    },
    {
      id: 2,
      title: "Music Concert",
      date: "2023-12-05",
      location: "Stadium",
    },
  ]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query) {
      setFilteredEvents(
        events.filter(
          (event) =>
            event.title.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredEvents(events);
    }
  }, [query, events]);

  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Search Results for "${query}"` : "Explore Events"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/event/${event.id}`}
                  className="btn btn-primary hover:scale-105 transition-transform duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && query && (
          <p className="col-span-full text-center text-gray-500">
            No events found for "{query}"
          </p>
        )}
      </div>
    </div>
  );
}
