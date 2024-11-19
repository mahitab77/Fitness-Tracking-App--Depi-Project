import { useState, useEffect } from "react";
import api from "../authContext/api";

/**
 * Custom hook to fetch data from a provided API URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} An object containing the data, loading, and error states.
 */
const useFetchData = (url) => {
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to indicate loading
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    /**
     * Async function to fetch data from the API using Axios.
     */
    const fetchData = async () => {
      try {
        // Make a GET request to the provided URL
        const response = await api.get(url);

        // Log the response data for debugging purposes
        // console.log("Fetched data:", response.data);

        // Store the fetched data in the state
        setData(response.data);

        // Set loading to false as data has been successfully fetched
        setLoading(false);
      } catch (err) {
        // Log any errors that occur during the API call
        console.error("Error fetching data:", err);

        // Store the error message in the state
        setError(err.message || "An error occurred");

        // Set loading to false as the fetch operation has completed (with error)
        setLoading(false);
      }
    };

    // Call the fetchData function to execute the API request
    fetchData();

  }, [url]); // Effect will re-run if the URL changes

  // Return the data, loading, and error states
  return { data, loading, error };
};

export default useFetchData;
