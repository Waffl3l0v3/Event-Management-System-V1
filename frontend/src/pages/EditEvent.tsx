import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditEvent() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "Sample Event",
    description: "Description",
    date: "2023-12-01",
    location: "Venue",
  });

  useEffect(() => {
    // Fetch event data
    // For now, already set in state
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update event API call
    console.log("Updating event", form);
  };

  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          className="input input-bordered w-full focus:input-primary transition-all duration-200"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full focus:textarea-primary transition-all duration-200"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="date"
          className="input input-bordered w-full focus:input-primary transition-all duration-200"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full focus:input-primary transition-all duration-200"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button
          type="submit"
          className="btn btn-primary hover:scale-105 transition-transform duration-200"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
