export default function LandingPage() {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-primary to-secondary animate-fade-in">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-white mb-5">
            Event Management System
          </h1>
          <p className="mb-5 text-white/80">
            Create and manage events easily with our comprehensive platform.
          </p>
          <button className="btn btn-accent hover:scale-105 transition-transform duration-200">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
