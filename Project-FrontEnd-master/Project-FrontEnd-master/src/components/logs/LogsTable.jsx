import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Importing ShadCN card components for UI

/**
 * LogsTable component is responsible for displaying logs
 * for a specific activity (e.g., weight, sleep, workouts).
 * It displays the logs as cards and shows a message if no logs are found.
 *
 * @param {Array} logs - Array of logs data to display
 * @param {String} tableHead1 - Type of the activity (e.g., weight, steps, sleep)
 * @param {Boolean} loading - Flag to show if data is being loaded
 * @param {Boolean} error - Error flag or message if there's an issue loading logs
 */
const LogsTable = ({ logs, tableHead1, loading, error }) => {
  /**
   * capitalizeFirstLetter: Helper function to capitalize the first letter of a string
   * @param {string} string - The input string to be capitalized
   * @returns {string} - The input string with the first letter capitalized
   */
  const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty strings by returning an empty string
    return string.charAt(0).toUpperCase() + string.slice(1); // Capitalize the first letter of the string
  };

  // If there's an error fetching the data, display the error message
  if (error) {
    return <div className="my-10 text-center text-red-500">{error}</div>;
  }

  // If data is still loading, show a loading indicator
  if (loading) {
    return (
      <div className="my-10 text-center text-gray-500">Loading logs...</div>
    );
  }

  // Only show "No logs found" message if logs have been fetched but are empty
  if (!logs || logs.length === 0) {
    return (
      <div className="my-10 text-center text-gray-500">
        No logs found for this type of logs.
      </div>
    );
  }

  // Return and display logs as cards if data is available
  return (
    <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {/* If the selected log type is 'workouts', display workout data */}
      {tableHead1 === "workouts"
        ? logs.map(
            (activity) =>
              activity.workoutId && (
                <Card key={activity._id} className="w-full p-6">
                  <CardHeader>
                    {/* Display the workout name, safely access the nested workoutId and workoutName */}
                    <CardTitle className="text-lg">
                      {capitalizeFirstLetter(
                        activity.workoutId.workoutName || "Unknown Workout",
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <span>
                        <strong>Type:</strong>{" "}
                        {activity.workoutId.workoutType || "N/A"}
                      </span>{" "}
                      {/* Displaying workout type */}
                      <br />
                      <span>
                        <strong>Duration:</strong> {activity.duration} minutes
                      </span>{" "}
                      {/* Displaying workout duration */}
                      <br />
                      <span>
                        <strong>Calories Burned:</strong>{" "}
                        {activity.caloriesBurned || "N/A"} kcal
                      </span>{" "}
                      {/* Displaying calories burned */}
                      <br />
                      <span>
                        <strong>Date:</strong>{" "}
                        {new Date(activity.logDate).toLocaleDateString()}
                      </span>{" "}
                      {/* Displaying the log date */}
                      <br />
                      <span>
                        <strong>Primary Muscles:</strong>{" "}
                        {activity.workoutId.primaryMuscles.join(", ")}
                      </span>{" "}
                      {/* Displaying primary muscles */}
                      <br />
                      <span>
                        <strong>Secondary Muscles:</strong>{" "}
                        {activity.workoutId.secondaryMuscles.join(", ")}
                      </span>{" "}
                      {/* Displaying secondary muscles */}
                      <br />
                      {/* Render set details if available */}
                      {activity.setDetails &&
                        activity.setDetails.map((set, index) => (
                          <span className="block" key={index}>
                            <span>
                              <strong>Set {set.setNo}:</strong> {set.reps} reps,
                              Intensity: {set.intensity}
                            </span>
                          </span>
                        ))}
                    </CardDescription>
                  </CardContent>
                </Card>
              ),
          )
        : /* For other activity types (sleep, water, steps, weight, etc.), display their respective data */
          logs.map((activity) => (
            <Card key={activity._id} className="w-full p-6">
              <CardHeader>
                {/* Display the activity type, e.g., "Weight", "Steps", "Sleep", etc. */}
                <CardTitle className="text-lg">
                  {capitalizeFirstLetter(tableHead1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {/* Displaying the logged value of the activity, e.g., 70kg for weight or 8 hours for sleep */}
                  <span>
                    {activity.valueLogged} {activity.metric}
                  </span>
                  <br />
                  {/* Displaying the date of the activity log */}
                  <span>
                    Date: {new Date(activity.logDate).toLocaleDateString()}
                  </span>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
    </div>
  );
};

export default LogsTable;
