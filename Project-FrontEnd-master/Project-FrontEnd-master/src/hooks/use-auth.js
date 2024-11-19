import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
