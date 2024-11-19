import { createContext, useState, useEffect } from "react";
import api, { setAuthHeader } from "./api";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [session, setSession] = useState(null); // Holds the user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        if (storedAccessToken) {
          setAuthHeader(storedAccessToken);
          setAccessToken(storedAccessToken);

          // Optionally, you can check if the token is valid by calling an endpoint
          const userResponse = await api.get("/users/byrefresh", {
            withCredentials: true,
          });

          // Set the user session from the response
          setSession(userResponse.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("Failed to refresh session:", error);
        // Clear any invalid tokens or sessions
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    };

    refreshAccessToken(); // Call the async function to handle token refresh
  }, []);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { accessToken, user } = response.data; // Destructure the user data from the response

      // Set the access token in state and attach it to requests
      setAccessToken(accessToken);
      setAuthHeader(accessToken);

      // Store accessToken in localStorage to persist session
      localStorage.setItem("accessToken", accessToken);

      // Set the user session directly from the response
      setSession(user);
      sessionStorage.setItem("session", JSON.stringify(user)); // Optionally store session for quick access
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    setAccessToken(null);
    setAuthHeader(null);
    sessionStorage.removeItem("session");
    localStorage.removeItem("accessToken"); // Clear token from localStorage
    window.location.href = "/";
    await api.get("/auth/logout", { credentials: true });
  };

  const value = {
    accessToken,
    login,
    logout,
    loading,
    session,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};
