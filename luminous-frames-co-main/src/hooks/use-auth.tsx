import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "client" | "admin";
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "client" | "admin") => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes (in production, this would come from your backend)
const MOCK_USERS = {
  client: [
    { id: "1", email: "client@example.com", password: "client123", firstName: "John", lastName: "Client", role: "client" as const },
    { id: "2", email: "jane@example.com", password: "client123", firstName: "Jane", lastName: "Doe", role: "client" as const }
  ],
  admin: [
    { id: "admin1", email: "admin@example.com", password: "admin123", firstName: "Admin", lastName: "User", role: "admin" as const }
  ]
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: "client" | "admin") => {
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = MOCK_USERS[role];
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Navigate based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/client/albums");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAdmin: user?.role === "admin",
      isClient: user?.role === "client"
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}