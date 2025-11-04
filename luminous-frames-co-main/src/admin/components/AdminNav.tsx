import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Camera,
  FileText,
  MessageCircle,
  CreditCard,
  Settings,
  Image,
  Upload,
  LogOut,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  description?: string;
}

const items: NavItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
    description: "View your dashboard analytics and performance"
  },
  {
    label: "Clients",
    icon: Users,
    href: "/admin/clients",
    description: "Manage your client database"
  },
  {
    label: "Bookings",
    icon: Calendar,
    href: "/admin/bookings",
    description: "Handle photography session bookings"
  },
  {
    label: "Albums",
    icon: Camera,
    href: "/admin/albums",
    description: "Manage photo albums and collections"
  },
  {
    label: "Photos",
    icon: Image,
    href: "/admin/photos",
    description: "Browse and manage uploaded photos"
  },
  {
    label: "Upload",
    icon: Upload,
    href: "/admin/upload",
    description: "Upload new photos and media"
  },
  {
    label: "Contracts",
    icon: FileText,
    href: "/admin/contracts",
    description: "Manage client contracts and agreements"
  },
  {
    label: "Inquiries",
    icon: MessageCircle,
    href: "/admin/inquiries",
    description: "Handle client inquiries and messages"
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/admin/payments",
    description: "Track payments and invoices"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    description: "Configure system settings"
  }
];

const AdminNav = () => {
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

  return (
    <nav className="flex flex-col gap-2 p-6 h-full">
      <div className="px-3 py-2">
        <h2 className="mb-4 text-2xl font-serif font-semibold">
          Admin Panel
        </h2>
        {user && (
          <p className="text-sm text-muted-foreground">
            Welcome, {user.firstName}!
          </p>
        )}
      </div>
      <div className="space-y-2 flex-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors relative group",
                location.pathname === item.href
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-accent hover:bg-accent/10"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {item.description && (
                <div className="absolute left-full ml-2 hidden group-hover:block">
                  <div className="bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                    {item.description}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default AdminNav;