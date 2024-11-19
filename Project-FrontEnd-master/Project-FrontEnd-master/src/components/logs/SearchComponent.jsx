import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetchData from "@/hooks/useFetchData"; // Custom hook for data fetching
import LoadingErrorDisplay from "@/components/ui/LoadingErrorDisplay"; // Component for handling loading and error

const SearchComponent = (props) => {
  const [searchInput, setSearchInput] = useState(""); // State to store search input
  const { data: workoutsData, loading, error } = useFetchData(
    "https://project-back-end-delta.vercel.app/api/workouts?userId=6708f5ce747967bca7c6153a"
  ); // Fetch workouts data using the custom hook
  const [filteredWorkouts, setFilteredWorkouts] = useState([]); // State to store filtered workout data

  // Filter workouts based on search input
  const handleSearch = (e) => {
    e.preventDefault();

    if (!workoutsData) return; // Safety check if data is not available

    const filteredData = workoutsData.filter((workout) =>
      workout.workoutName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredWorkouts(filteredData); // Update filtered workouts
  };

  // If there's an error or loading, display appropriate UI feedback
  if (loading || error) {
    return <LoadingErrorDisplay loading={loading} error={error} />;
  }

  // If no workouts found after search
  const displayedWorkouts = filteredWorkouts.length > 0 ? filteredWorkouts : workoutsData;

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex w-full items-center">
        <Input
          className="mr-5"
          type="text"
          placeholder={props.placeholder || "Search workouts..."}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // Update search input value
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Display workout results */}
      <div className="mt-5">
        {displayedWorkouts && displayedWorkouts.length > 0 ? (
          <ul>
            {displayedWorkouts.map((workout) => (
              <li key={workout._id}>
                <strong>{workout.workoutName}</strong> - {workout.workoutType}
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
