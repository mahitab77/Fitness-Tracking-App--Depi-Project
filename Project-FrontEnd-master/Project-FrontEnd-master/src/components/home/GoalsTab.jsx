import { useEffect, useState } from "react";
import GoalsCard from "./GoalsTab/GoalsCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useGoals } from "./GoalsTab/useGoals";
import { compareGoalsWithLogs } from "./GoalsTab/compareGoalsWithLogs";

const GoalsTab = () => {
  const { session } = useAuth(); // Get session from the AuthContext
  // console.log(session);

  const userId = session?.id; // Correctly extract userId
  const [results, setResults] = useState([]);
  const [loadingSession, setLoadingSession] = useState(true); // Loading state for session
  const [loadingGoals, setLoadingGoals] = useState(true); // Loading state for goals and logs
  const navigate = useNavigate();

  // console.log("GoalsTab userId:", userId);

  // Effect to check when session is fully loaded
  useEffect(() => {
    if (session) {
      setLoadingSession(false); // Session data has been loaded
    }
  }, [session]);

  // Fetch goals and logs using useGoals hook after session is loaded
  const { goals, filteredLogs, filteredWorkoutLogs, loading } = useGoals(
    userId || "",
  );

  console.log("usergoals", goals);

  useEffect(() => {
    if (!userId || loadingSession || loading) {
      return; // Wait for userId, session, and goals/logs data before proceeding
    }

    if (goals.length > 0) {
      const comparisonResults = compareGoalsWithLogs(
        goals,
        filteredLogs,
        filteredWorkoutLogs,
      );
      console.log("compare", comparisonResults);

      setResults(comparisonResults);
    }

    // Only set loadingGoals to false once goals and logs are fully fetched
    setLoadingGoals(false);
  }, [
    goals,
    filteredLogs,
    filteredWorkoutLogs,
    userId,
    loadingSession,
    loading,
  ]);

  // While session or goals/logs are loading, show a loading spinner
  if (loadingSession || loadingGoals || loading) {
    return (
      <div className="mt-24 flex w-full flex-col items-center justify-center">
        <p className="mb-4 text-2xl text-orange-500">Loading data...</p>
      </div>
    );
  }

  // If there are no goals, show message and button to set goals
  if (!goals || goals.length === 0) {
    return (
      <div className="mt-24 flex w-full flex-col items-center justify-center">
        <p className="mb-4 text-2xl text-orange-500">No goals set yet!</p>
        <Button
          className="rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600"
          onClick={() => navigate("/goals")}
        >
          Start Setting Goals
        </Button>
      </div>
    );
  }

  // // Filter out goals with no quantity or targetValue set
  // const filteredResults = results.filter(
  //   (result) => result.goal.quantity || result.goal.targetValue,
  // );

  return (
    <div className="grid max-h-[calc(100dvh_-_150px)] w-full grid-cols-[repeat(auto-fill,_minmax(290px,_1fr))] items-center justify-center gap-y-12 overflow-y-auto px-3 pb-6 pt-10">
      {goals.length > 0 &&
        results.map((result, index) => (
          <GoalsCard
            key={index}
            goal={result.goal}
            achieved={result.achieved}
            currentProgress={result.currentProgress}
            loading={loadingGoals} // Pass loading state for each card
          />
        ))}
    </div>
  );
};

export default GoalsTab;
