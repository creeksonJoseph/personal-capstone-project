import { useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/check-auth/`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
        setUsername(data.username || "");
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    console.log("=== Login Attempt ===");
    console.log("Username:", username);
    console.log("Password length:", password ? password.length : 0);
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setIsAuthenticated(true);
        setUsername(data.username);
        console.log("Login successful");
        return { success: true };
      } else {
        console.error("Login failed with status:", response.status);
        return { success: false, error: data.error || "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: "An error occurred. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthenticated(false);
      setUsername("");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    username,
    login,
    logout,
    checkAuth,
  };
};
