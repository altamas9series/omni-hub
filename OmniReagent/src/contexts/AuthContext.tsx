import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { API_BASE_URL } from "@/config";

export interface User {
  id: string;
  email: string;
  fullName: string;
  fname?: string;
  lname?: string;
  role: string;
  designation?: string;
  organization: string;
  timezone: string;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    digest: boolean;
  };
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  type: "sync" | "document" | "pfas" | "rfi" | "system";
  icon?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean }>;
  resetPassword: (newPassword: string) => Promise<{ success: boolean }>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: "user-1",
  email: "john.smith@acmecorp.com",
  fullName: "John Smith",
  fname: "John",
  lname: "Smith",
  role: "Compliance Officer",
  designation: "Compliance Officer",
  organization: "ACME Corporation",
  timezone: "America/New_York",
  notificationPreferences: {
    email: true,
    push: true,
    digest: false,
  },
};

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Cloud Storage Connected",
    description: "Google Drive has been successfully connected to your account.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    type: "sync",
  },
  {
    id: "n2",
    title: "Document Processed",
    description: "2014_Warehouse_Invoice.pdf has been indexed with 3 PFAS candidates found.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    type: "document",
  },
  {
    id: "n3",
    title: "PFAS Candidate Identified",
    description: "High-risk PFOA compound detected in supplier invoice from ChemCorp.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    type: "pfas",
  },
  {
    id: "n4",
    title: "RFI Drafted",
    description: "Request for Information drafted for Apex Chemical regarding Teflon Coating.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    type: "rfi",
  },
  {
    id: "n5",
    title: "Auto-Sync Complete",
    description: "Dropbox sync completed. 12 new documents added to processing queue.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    type: "sync",
  },
  {
    id: "n6",
    title: "System Update",
    description: "PFAS database updated with 45 new CAS numbers from EPA registry.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    read: true,
    type: "system",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isLoading, setIsLoading] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchUserProfile = useCallback(async (): Promise<{ success: boolean }> => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return { success: false };
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          ...mockUser, // Keep mock preferences/etc that aren't in API yet
          id: data.id.toString(),
          email: data.email,
          fname: data.fname,
          lname: data.lname,
          fullName: `${data.fname} ${data.lname}`.trim(),
          designation: data.designation,
          role: data.designation || mockUser.role,
          organization: data.organisation || data.organization || mockUser.organization,
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      } else {
        // Token invalid or expired
        localStorage.removeItem('auth_token');
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return { success: false };
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsLoading(false);
      return { success: false };
    }
  }, []);

  // Check auth on mount
  React.useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = useCallback(async (email: string, password: string, remember: boolean): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.detail || "Invalid credentials. Please try again." };
      }

      const data = await response.json();

      // Store the token
      localStorage.setItem('auth_token', data.access_token);

      // Fetch user profile
      const userResult = await fetchUserProfile();
      if (!userResult.success) {
        return { success: false, error: "Authenticated but failed to load profile." };
      }

      if (remember) {
        // In a real app, you might handle "Remember me" differently, 
        // e.g., by setting a longer expiration for the token storage or a cookie.
        // For now, localStorage is persistent enough for this demo.
        localStorage.setItem('remember_me', 'true');
      } else {
        localStorage.removeItem('remember_me');
      }

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again later." };
    }
  }, []);

  const register = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // Use a generic error message if the backend doesn't provide one or parsing fails
        return { success: false, error: errorData.detail || "Registration failed. Please try again." };
      }

      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Network error. Please try again later." };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('remember_me');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const requestPasswordReset = useCallback(async (email: string): Promise<{ success: boolean }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  }, []);

  const resetPassword = useCallback(async (newPassword: string): Promise<{ success: boolean }> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        return { success: false, error: "Not authenticated" };
      }

      // Prepare payload
      const payload: any = {
        fname: updates.fname,
        lname: updates.lname,
        designation: updates.designation || updates.role,
        organisation: updates.organization // Note: API uses 'organisation' (s)
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/users/profile`, {
        method: 'PATCH',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.detail || "Failed to update profile." };
      }

      const data = await response.json();

      // Update local user state with returned data
      setUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          ...updates, // Optimistic update / merge
          fname: data.fname,
          lname: data.lname,
          fullName: `${data.fname} ${data.lname}`.trim(),
          designation: data.designation,
          role: data.designation || prev.role, // Map designation back to role for UI compatibility
          organization: data.organisation || data.organization, // Handle potential spelling diffs
          // notificationPreferences are not returned by this specific API endpoint based on the example,
          // so we keep existing ones or the ones passed in updates if we were handling them separately.
          // The current prompt example response doesn't show notification prefs, so we preserve 'prev' values.
        };
      });

      return { success: true };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, error: "Network error. Please try again later." };
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAsUnread = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `n-${Date.now()}`,
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        register,
        logout,
        requestPasswordReset,
        resetPassword,
        updateProfile,
        notifications,
        unreadCount,
        markAsRead,
        markAsUnread,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
