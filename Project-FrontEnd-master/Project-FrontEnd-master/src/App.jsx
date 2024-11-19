import { Navigate, Route, Routes } from "react-router-dom"; // Importing necessary components from react-router-dom for routing
import Layout from "./components/layout/Layout"; // Layout component that wraps around the main pages
import ProgressPage from "./components/home/Progress"; // Progress page showing user's progress
import GoalsPage from "./components/goals/GoalsPage"; // Main goals page
import GoalsPreview from "./components/goals/shared/GoalsPreview"; // Preview of user's goals
import TargetWeight from "./components/goals/TargetWeight"; // Goal for target weight
import Steps from "./components/goals/Steps"; // Goal for steps
import Sleep from "./components/goals/Sleep"; // Goal for sleep hours
import Water from "./components/goals/Water"; // Goal for water intake
import WorkoutForm from "./components/goals/WorkoutForm"; // Form for workout goals
import CalIntake from "./components/goals/CalIntake"; // Edit goal for calorie intake
import CalBurned from "./components/goals/CalBurned"; // Edit goal for calorie burning
import SelectWorkout from "./components/logs/SelectWorkout"; // Page to select a workout
import WorkoutDetails from "./components/logs/WorkoutDetails"; // Page to view details of a specific workout
import LogHome from "./components/logs/LogHome"; // Home page for logging activities
import WorkoutLogForm from "./components/logs/workoutloggingForms/WorkoutLogForm"; // Form to log a workout
import WeightLog from "./components/logs/WeightLog"; // Log page for weight tracking
import WaterLog from "./components/logs/WaterLog"; // Log page for water intake tracking
import StepsLog from "./components/logs/StepsLog"; // Log page for steps tracking
import CaloriesLog from "./components/logs/CaloriesLog"; // Log page for both calorie intake and burned calories
import SleepLog from "./components/logs/SleepLog"; // Log page for sleep tracking

/**
 * Main App component that contains all the routes of the application.
 * It uses react-router-dom for navigation between pages.
 */

import Register from "./components/auth/Register";
import LogIn from "./components/auth/LogIn";
import { useAuth } from "./hooks/use-auth";
import Setting from "./components/setting/Setting";

function App() {
  const { session } = useAuth();

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />

          <Route
            path="/"
            element={!session ? <Navigate to="/login" /> : <ProgressPage />}
          />
          {/* goals routes */}
          <Route
            path="/goals"
            element={!session ? <Navigate to="/login" /> : <GoalsPage />}
          />
          <Route
            path="/goals/target-weight"
            element={!session ? <Navigate to="/login" /> : <TargetWeight />}
          />
          <Route
            path="/goals/steps"
            element={!session ? <Navigate to="/login" /> : <Steps />}
          />
          <Route
            path="/goals/sleep"
            element={!session ? <Navigate to="/login" /> : <Sleep />}
          />
          <Route
            path="/goals/water"
            element={!session ? <Navigate to="/login" /> : <Water />}
          />
          <Route
            path="/goals/goal-preview"
            element={!session ? <Navigate to="/login" /> : <GoalsPreview />}
          />
          <Route
            path="/goals/intake"
            element={!session ? <Navigate to="/login" /> : <CalIntake />}
          />
          <Route
            path="/goals/burn"
            element={!session ? <Navigate to="/login" /> : <CalBurned />}
          />
          <Route
            path="/goals/workouts"
            element={!session ? <Navigate to="/login" /> : <WorkoutForm />}
          />
          {/* logs routes */}
          <Route
            path="/log"
            element={!session ? <Navigate to="/login" /> : <LogHome />}
          />
          <Route
            path="/log/selectworkout"
            element={!session ? <Navigate to="/login" /> : <SelectWorkout />}
          />
          <Route
            path="/log/workoutdetails"
            element={!session ? <Navigate to="/login" /> : <WorkoutDetails />}
          />
          <Route
            path="/log/workoutdetails/:workoutId"
            element={!session ? <Navigate to="/login" /> : <WorkoutDetails />}
          />
          <Route
            path="/log/logworkout"
            element={!session ? <Navigate to="/login" /> : <WorkoutLogForm />}
          />
          <Route
            path="/log/weight"
            element={!session ? <Navigate to="/login" /> : <WeightLog />}
          />
          <Route
            path="/log/sleep"
            element={!session ? <Navigate to="/login" /> : <SleepLog />}
          />
          <Route
            path="/log/water"
            element={!session ? <Navigate to="/login" /> : <WaterLog />}
          />
          <Route
            path="/log/steps"
            element={!session ? <Navigate to="/login" /> : <StepsLog />}
          />
          {/* Single component for both intake and burned */}
          <Route
            path="/log/calories"
            element={!session ? <Navigate to="/login" /> : <CaloriesLog />}
          />

          <Route
            path="/setting"
            element={!session ? <Navigate to="/login" /> : <Setting />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
