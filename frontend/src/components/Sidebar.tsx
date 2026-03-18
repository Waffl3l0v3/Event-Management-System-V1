import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
}

// Helper component to render clean SVG line icons
const NavIcon = ({ path }: { path: string }) => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function Sidebar({ isOpen }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const attendeeLinks = [
    { name: "Home", path: "/home", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
    { name: "Explore", path: "/explore", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
    { name: "My Registrations", path: "/my-registrations", icon: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" },
    { name: "Saved Events", path: "/saved-events", icon: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" },
    { name: "Following", path: "/following", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
    { name: "Notifications", path: "/notifications", icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" },
  ];

  const organizerLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" },
    { name: "My Events", path: "/my-events", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" },
    { name: "Create Event", path: "/create-event", icon: "M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" },
    { name: "Registrations", path: "/registrations", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
    { name: "Analytics", path: "/analytics", icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" },
    { name: "Notifications", path: "/notifications", icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" },
  ];

  const links = user.role === "organizer" ? organizerLinks : attendeeLinks;

  return (
    <aside
      className={`bg-base-100 h-full transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Sidebar Header Space (can be used for secondary branding if needed) */}
      <div className="h-16 flex items-center justify-center">
        {isOpen ? (
          <span className="font-bold text-lg text-primary truncate px-4">
            {user.role === "organizer" ? "Organizer Panel" : "Attendee Menu"}
          </span>
        ) : (
          <span className="text-primary hover:rotate-90 transition-transform duration-300">
            <NavIcon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <div className={`flex-1 py-4 ${isOpen ? "overflow-y-auto" : "overflow-hidden"}`}>
        <ul className="menu w-full px-2 gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                {isOpen ? (
                  <Link
                    to={link.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-base-200 text-primary font-semibold"
                        : "text-base-content hover:bg-base-200 hover:text-primary"
                    }`}
                  >
                    <NavIcon path={link.icon} />
                    <span className="font-medium whitespace-nowrap">
                      {link.name}
                    </span>
                  </Link>
                ) : (
                  // DaisyUI Tooltip is used when collapsed so the user knows what the icon does
                  <div
                    className="tooltip tooltip-right w-full"
                    data-tip={link.name}
                  >
                    <Link
                      to={link.path}
                      className={`flex justify-center items-center py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-base-200 text-primary"
                          : "text-base-content hover:bg-base-200 hover:text-primary"
                      }`}
                    >
                      <NavIcon path={link.icon} />
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Optional: Footer section of sidebar for settings/help */}
      <div className="p-4">
        <div className={isOpen ? "text-left" : "text-center"}>
          <span className="text-xs text-base-content/50 truncate block">
            {isOpen ? "Event Management v1.0" : "v1.0"}
          </span>
        </div>
      </div>
    </aside>
  );
}