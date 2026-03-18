import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState<any>(null);
  const [organizer, setOrganizer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
        // Fetch organizer details if we have the ID
        if (data.organizer) {
          fetchOrganizer(data.organizer);
        }
      } else {
        console.error("Failed to load event");
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizer = async (orgId: string) => {
    try {
      // Assuming you have an endpoint to fetch a user's public profile
      const res = await fetch(`/api/users/${orgId}`);
      if (res.ok) {
        const data = await res.json();
        setOrganizer(data);
      }
    } catch (error) {
      console.error("Failed to fetch organizer info:", error);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      // Trigger auth modal or redirect to home if not logged in
      alert("Please log in to register for events.");
      return;
    }

    try {
      setProcessing(true);
      
      if (event.price > 0) {
        // 1. Paid Event - Call Payment Controller
        const res = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: id }),
        });
        const data = await res.json();
        
        if (res.ok) {
          alert(`Payment order created for $${data.amount}. Integrating Gateway (Razorpay/Stripe)...`);
          // TODO: Open Razorpay/Stripe checkout modal here using 'data'
        } else {
          alert(data.message || "Failed to initiate payment");
        }
      } else {
        // 2. Free Event - Direct Registration
        const res = await fetch(`/api/registrations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId: id }),
        });
        
        if (res.ok) {
          alert("Successfully registered for the event!");
          fetchEventDetails(); // Refresh to update registered count
        } else {
          const data = await res.json();
          alert(data.message || "Failed to register");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`/api/events/comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: commentText }),
      });
      
      if (res.ok) {
        setCommentText("");
        fetchEventDetails(); // Refetch event to show new comment
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Link to="/explore" className="btn btn-primary mt-4">Back to Explore</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto animate-fade-in pb-12">
      {/* Cover Image */}
      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 relative shadow-lg">
        <img 
          src={event.coverImg || `https://placehold.co/1200x600/2a323c/ffffff?text=${encodeURIComponent(event.title)}`} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`badge badge-lg ${event.status === 'completed' ? 'badge-error' : 'badge-success'}`}>
            {event.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Details & Comments */}
        <div className="lg:w-2/3 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-base-content mb-4">{event.title}</h1>
            <p className="text-lg text-base-content/80 whitespace-pre-line leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Organizer Info */}
          <div className="card bg-base-100 border border-base-200 shadow-sm p-4 flex-row items-center gap-4">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full border">
                <img src={organizer?.profileImg || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"} alt="Organizer" />
              </div>
            </div>
            <div>
              <p className="text-sm text-base-content/60 font-medium uppercase tracking-wide">Organized By</p>
              <h3 className="font-bold text-lg">{organizer?.username || organizer?.name || "Event Organizer"}</h3>
            </div>
            <button className="btn btn-outline btn-sm ml-auto hidden sm:flex">Follow</button>
          </div>

          {/* Comments Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
              Discussions ({event.comments?.length || 0})
            </h3>
            
            <form onSubmit={handleAddComment} className="flex gap-4 mb-8">
              <div className="avatar hidden sm:block">
                <div className="w-12 h-12 rounded-full border">
                  <img src={user?.profileImg || "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"} alt="You" />
                </div>
              </div>
              <div className="flex-1 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask a question or share your thoughts..." 
                  className="input input-bordered w-full" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" disabled={!commentText.trim()}>Post</button>
              </div>
            </form>

            <div className="space-y-4">
              {event.comments && event.comments.length > 0 ? (
                event.comments.map((comment: any) => (
                  <div key={comment._id} className="bg-base-200/50 rounded-xl p-4 flex gap-4">
                    {/* Render comments here. Requires 'comments' to be populated in backend viewEvent response */}
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">{comment.user?.username || "User"}</p>
                      <p className="text-base-content/80">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-base-content/50 italic text-center py-4">No comments yet. Be the first to start the discussion!</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Registration Card */}
        <div className="lg:w-1/3">
          <div className="card bg-base-100 shadow-xl border border-base-200 sticky top-24">
            <div className="card-body">
              <h2 className="text-3xl font-black text-primary mb-2">
                {event.price === 0 ? "Free" : `$${event.price}`}
              </h2>
              
              <div className="py-4 space-y-4 border-y border-base-200 mb-4">
                <p className="flex items-center gap-3 text-base-content/80"><span className="text-xl">📅</span> {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <p className="flex items-center gap-3 text-base-content/80"><span className="text-xl">📍</span> {event.location}</p>
                <p className="flex items-center gap-3 text-base-content/80"><span className="text-xl">👥</span> {event.registeredCount || 0} / {event.capacity === 'none' ? 'Unlimited' : event.capacity} Attending</p>
              </div>

              <button 
                className="btn btn-primary w-full text-lg h-14"
                onClick={handleRegister}
                disabled={processing || event.status === 'completed' || (event.capacity !== 'none' && event.registeredCount >= parseInt(event.capacity))}
              >
                {processing ? "Processing..." : event.status === 'completed' ? "Event Ended" : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}