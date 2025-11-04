import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import {
  FolderOpen,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Camera,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  description?: string;
}

const items: NavItem[] = [
  {
    label: "My Albums",
    icon: FolderOpen,
    href: "/client/albums",
    description: "View your photo albums"
  },
  {
    label: "Favorites",
    icon: Heart,
    href: "/client/favorites",
    description: "Your favorite photos"
  },
  {
    label: "Feedback",
    icon: MessageSquare,
    href: "/client/feedback",
    description: "Share your feedback"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/client/settings",
    description: "Account settings"
  }
];

const ClientNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="flex flex-col h-full">
      {/* Header with User Info - Professional Design */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50/50">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 border-2 border-white shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-lg">
              {user ? getInitials(user.firstName, user.lastName) : <User className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-slate-900 truncate">
              {user ? `${user.firstName} ${user.lastName}` : "Client"}
            </h2>
            <p className="text-xs text-slate-600 truncate mt-0.5">
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200/50">
          <Camera className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Client Portal</span>
        </div>
      </div>

      {/* Navigation Items - Enhanced Styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 relative group",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 hover:shadow-md"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 transition-all duration-200",
                isActive && "scale-110"
              )} />
              <span className="flex-1 text-left">{item.label}</span>
              {!isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              {item.description && (
                <div className="absolute left-full ml-4 hidden group-hover:block z-50 pointer-events-none">
                  <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl border border-slate-700">
                    {item.description}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer with Logout - Refined */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent group"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
};

export default ClientNav;