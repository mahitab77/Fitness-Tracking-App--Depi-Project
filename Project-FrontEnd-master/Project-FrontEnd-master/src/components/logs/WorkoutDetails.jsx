import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, MoveLeft } from "lucide-react"; // Import the Dumbbell and MoveLeft icons
import api from "../../authContext/api";

// WorkoutDetails component to display detailed information of a specific workout
const WorkoutDetails = () => {
  const { workoutId } = useParams(); // Extract workoutId from the URL
  const [workout, setWorkout] = useState(null); // State to store the fetched workout details
  const [loading, setLoading] = useState(true); // State to handle the loading state
  const [error, setError] = useState(null); // State to store any errors during the API call
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId"); // Get userId from query params

  // Fetch workout details from API using the workoutId
  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await api.get(`workouts/${workoutId}`);
        setWorkout(response.data); // Store the workout data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching workout details:", err); // Log error for debugging
        setError("Failed to fetch workout details.");
        setLoading(false);
      }
    };

    if (workoutId) {
      fetchWorkoutDetails(); // Call the function to fetch workout data if workoutId exists
    }
  }, [workoutId]);

  // Return loading state, error state, or the workout details once available
  return (
    <div className="container">
      <div className="mx-10 my-5 flex-col items-center justify-center">
        {/* Centered workout title */}
        {workout && (
          <h3 className="mb-5 text-center font-bold text-orange-500">
            {workout.workoutName}
          </h3>
        )}

        {loading && <p>Loading workout details...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display workout details if available */}
        {workout && (
          <>
            {/* Buttons moved to the top */}
            <div className="mb-4 flex justify-between">
              <Button className="mr-5 w-40" asChild>
                <Link
                  to={`/log/logworkout?workoutId=${workout._id}&userId=${userId}`}
                >
                  <Dumbbell className="mr-2 h-4 w-4" /> Log Workout
                </Link>
              </Button>

              <Button variant="outline" className="w-40" asChild>
                <Link to="/log/selectworkout">
                  <MoveLeft className="mr-2 h-4 w-4" /> Back
                </Link>
              </Button>
            </div>

            <div className="mt-10">
              <div className="w-full overflow-hidden rounded-md">
                <img
                  src={
                    workout.imageUrl ||
                    "https://github.com/Nahla31/images/blob/main/workout.jpeg?raw=true" // Fallback image if none is provided
                  }
                  alt="Workout preview"
                  className="mx-auto w-1/3 object-cover"
                />
              </div>
              <p className="mx-10 my-8">{workout.workoutDescription}</p>

              {/* Display more workout details */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Workout Type:</strong> {workout.workoutType}
                  </p>
                  <p>
                    <strong>Primary Muscles:</strong>{" "}
                    {workout.primaryMuscles.join(", ")}
                  </p>
                  <p>
                    <strong>Secondary Muscles:</strong>{" "}
                    {workout.secondaryMuscles.join(", ")}
                  </p>
                  <p>
                    <strong>How It Works:</strong> {workout.howItWorks}
                  </p>
                  <p>
                    <strong>Sets/Duration:</strong>{" "}
                    {workout.setsOrDuration ? "Sets" : "Duration"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;
