import { useState, useEffect } from "react";
// import axios from "axios";
import moment from "moment";
import { calculateDateRange } from "../../../lib/utils";
import api from "../../../authContext/api";

// Base URL for API requests
// const deployedUrl = "https://project-back-end-delta.vercel.app/api";

// URL mapping for each log type
const urlMap = {
  workout: `/workoutslogs`,
  burn: `/logs/type/burn`,
  intake: `/logs/type/intake`,
  water: `/logs/type/water`,
  sleep: `/logs/type/sleep`,
  steps: `/logs/type/steps`,
  weight: `/logs/type/weight`,
};

/**
 * Main hook that fetches goals and logs for a given user and processes them accordingly.
 *
 * @param {String} userId - The user's unique ID for fetching goals and logs.
 * @returns {Object} - An object containing goals, filtered logs, filtered workout logs, loading state, and errors.
 */
export const useGoals = (userId) => {
  const [goals, setGoals] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filteredWorkoutLogs, setFilteredWorkoutLogs] = useState([]);
  const [loading, setLoading] = useState(true); // Combined loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoalsAndLogs = async () => {
      if (!userId) return; // Ensure userId is available before fetching

      setLoading(true); // Set loading before fetching data
      try {
        // console.log("Fetching goals for userId:", userId);

        // Step 1: Fetch all goals for the user
        const goalsResponse = await api.get(`/goals?userId=${userId}`);
        const goalsData = goalsResponse.data;
        setGoals(goalsData);

        // console.log("Goals fetched: ", goalsData);

        const filteredLogsData = [];
        const filteredWorkoutLogsData = [];

        // If there are no goals, stop the process
        if (goalsData.length === 0) {
          console.warn(`No goals found for userId: ${userId}`);
          setLoading(false); // Stop loading when no goals found
          return;
        }

        // Step 2: Process each goal and fetch corresponding logs
        for (const goal of goalsData) {
          const logType = goal.goalType; // Goal type (e.g., steps, burn, etc.)
          const interval = goal.interval || "daily"; // Default to daily if no interval provided
          const goalUrl = urlMap[logType]; // Get the correct URL for fetching logs based on goal type

          if (!goalUrl) {
            console.error(`No URL found for logType: ${logType}`);
            continue;
          }

          // Fetch logs only for valid goals (quantity for most types, targetValue for weight/workout)
          if (!goal.quantity && logType !== "workout" && logType !== "weight") {
            console.warn(`Skipping ${logType} goal due to missing quantity.`);
            continue;
          }
          if (
            (logType === "workout" || logType === "weight") &&
            !goal.quantity &&
            !goal.targetValue
          ) {
            console.warn(
              `Skipping ${logType} goal due to missing both quantity and targetValue.`,
            );
            continue;
          }

          // Step 3: Fetch logs for the logType
          const logResponse = await api.get(`${goalUrl}?userId=${userId}`);
          const logData = logResponse.data;
          console.log(logResponse);

          if (logData.length === 0) {
            console.warn(`No logs found for logType: ${logType}`);
            continue;
          }

          // // Step 4: Find the most recent log by sorting logs by date
          // const mostRecentLog = logData.sort((a, b) => new Date(b.logDate) - new Date(a.logDate))[0];
          // const endDate = mostRecentLog.logDate; // The most recent log date as the end date

          // ** Use `calculateDateRange` to get the start and end date **
          const { startDate, endDate: calcEndDate } = calculateDateRange(
            interval,
            0,
          );

          console.log("start", startDate);
          console.log("end", calcEndDate);

          // Step 5: Filter logs within the calculated date range
          const filteredLogsForGoal = logData.filter((log) =>
            moment(log.logDate).isBetween(startDate, calcEndDate, null, "[]"),
          );

          if (logType === "workout") {
            filteredWorkoutLogsData.push(...filteredLogsForGoal); // Store workout logs separately
          } else {
            filteredLogsData.push(...filteredLogsForGoal); // Store logs for other goal types
          }
        }

        // Step 6: Set the filtered logs and workout logs
        setFilteredLogs(filteredLogsData);
        setFilteredWorkoutLogs(filteredWorkoutLogsData);
      } catch (err) {
        console.log("Error fetching goals or logs:", err);
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false); // Stop loading once all data is fetched or if error occurs
      }
    };

    fetchGoalsAndLogs();
  }, [userId]);

  // Log the results to ensure the data is correct before further processing
  useEffect(() => {
    if (goals.length && (filteredLogs.length || filteredWorkoutLogs.length)) {
      console.log("Passing the following data to compareGoalsWithLogs:");
      console.log("Goals: ", goals);
      console.log("Filtered Logs: ", filteredLogs);
      console.log("Filtered Workout Logs: ", filteredWorkoutLogs);
    }
  }, [goals, filteredLogs, filteredWorkoutLogs]);

  // Explicitly handle the case where there are no goals or logs
  if (!goals.length && !loading) {
    return {
      goals: [],
      filteredLogs: [],
      filteredWorkoutLogs: [],
      loading,
      error,
    };
  }

  return { goals, filteredLogs, filteredWorkoutLogs, loading, error };
};
