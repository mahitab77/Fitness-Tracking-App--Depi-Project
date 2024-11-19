import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

// Create an Axios instance with the base URL of your backend API
const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Replace with your backend API URL
  withCredentials: true, // Important: This allows cookies to be sent with requests
});

// Add the access token to headers if it exists in state
export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const refreshAuthLogic = (failedRequest) =>
  api
    .post("/auth/refresh")
    .then((tokenRefreshResponse) => {
      const newAccessToken = tokenRefreshResponse.data.accessToken;

      // Update the Authorization header and retry the failed request
      setAuthHeader(newAccessToken);
      failedRequest.response.config.headers["Authorization"] =
        `Bearer ${newAccessToken}`;

      return Promise.resolve();
    })
    .catch((error) => {
      console.error("Refresh token is invalid or expired:", error);

      // Handle logout or redirect to login
      localStorage.removeItem("accessToken");
      // window.location.href = "/login";

      return Promise.reject(error);
    });

// Attach the refresh logic to the Axios instance
createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
