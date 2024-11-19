import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Info } from "lucide-react";

/**
 * WorkoutCard displays information for a specific workout.
 *
 * @param {Object} workout - The workout data.
 * @param {String} userId - The current user's ID.
 */
export default function WorkoutCard({ workout, userId }) {
  // Log the workout ID to check if it's being passed
  // console.log("Workout ID in WorkoutCard:", workout._id); // <-- Check if _id is correct

  return (
    <Card className="max-w-[350px] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold text-orange-500">
          {workout.workoutName || "Untitled Workout"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <img
            src={
              workout.imageUrl ||
              "https://github.com/Nahla31/images/blob/main/workout.jpeg?raw=true"
            } // Use default image if none is provided
            alt="Workout preview"
            className="object-cover w-full h-full"
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {workout.workoutDescription?.trim() !== ""
            ? workout.workoutDescription
            : "No description provided"}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between mt-4 space-x-2">
        {/* Log Workout Button */}
        <Button className="w-full" asChild>
          <Link to={`/log/logworkout?workoutId=${workout._id}&userId=${userId}`}>
            <Dumbbell className="mr-2 h-4 w-4" /> Log Workout
          </Link>
        </Button>

            {/* View Details Button */}

            <Button variant="outline" className="w-full" asChild>
              <Link
                to={`/log/workoutdetails/${workout._id}?userId=${userId}`}
                className="flex items-center"
              >
                <Info className="mr-2 h-4 w-4" /> View Details
              </Link>
            </Button>

        </CardFooter>

    </Card>
  );
}
