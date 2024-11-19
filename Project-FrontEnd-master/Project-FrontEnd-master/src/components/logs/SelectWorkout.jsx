import { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/useFetchData";
import LoadingErrorDisplay from "@/components/ui/LoadingErrorDisplay";
import { useAuth } from "../../hooks/use-auth";

const SelectWorkout = () => {
  const { session } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  const userId = session.id;

  // Fetch workouts data using custom hook
  const { data: workouts, loading, error } = useFetchData(`/workouts`);

  // Log workouts data to inspect the structure
  // useEffect(() => {
  //   if (workouts) {
  //     console.log("Fetched workouts data:", workouts); // <-- Log workouts here
  //   }
  // }, [workouts]);

  // Filter the workouts based on search input
  useEffect(() => {
    if (workouts && workouts.length > 0) {
      const filtered = workouts.filter((workout) =>
        workout.workoutName?.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredWorkouts(filtered);
    }
  }, [searchInput, workouts]);

  return (
    <div className="container">
      <div className="my-8">
        <div className="flex w-full items-center">
          <Input
            className="mr-5"
            type="text"
            placeholder="Search workouts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            onClick={() => {
              setFilteredWorkouts(workouts);
              setSearchInput("");
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Loading and error display */}
      <LoadingErrorDisplay loading={loading} error={error} />

      {/* Display workout cards */}
      {workouts && (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] gap-x-4 gap-y-8 p-4">
          {filteredWorkouts.length > 0
            ? filteredWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  userId={userId}
                />
              ))
            : workouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  userId={userId}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default SelectWorkout;
