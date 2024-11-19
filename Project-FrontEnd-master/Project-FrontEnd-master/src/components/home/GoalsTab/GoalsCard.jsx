import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaDumbbell, FaFire, FaAppleAlt, FaTint, FaBed, FaWalking, FaWeight, FaSpinner } from "react-icons/fa"; // Add FaSpinner for loading

// Icons for different goal types
const goalIcons = {
  workout: <FaDumbbell className="text-4xl text-background" />,
  burn: <FaFire className="text-4xl text-background" />,
  intake: <FaAppleAlt className="text-4xl text-background" />,
  water: <FaTint className="text-4xl text-background" />,
  sleep: <FaBed className="text-4xl text-background" />,
  steps: <FaWalking className="text-4xl text-background" />,
  weight: <FaWeight className="text-4xl text-background" />,
};

// Helper to define goal descriptions
const goalDescriptions = {
  workout: "Keep up the good work",
  burn: "Let the fire keep burning",
  intake: "Take care of what you eat",
  water: "Stay hydrated",
  sleep: "Get your full rest",
  steps: "Every step counts",
  weight: "Keep your weight in check",
};

// Helper to define goal units
const goalUnits = {
  workout: "Workouts",
  burn: "kcal",
  intake: "kcal",
  water: "Liters",
  sleep: "Hours",
  steps: "Steps",
  weight: "Kg",
};

// Helper function to format large numbers
const formatNumber = (number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  }
  return number?.toString();
};

// GoalsCard component
const GoalsCard = ({ goal, achieved, currentProgress }) => {
  // console.log(goal);
  
  const goalType = goal.goalType;
  const goalTarget = goal.quantity || goal.targetValue || goal.duration;
  const interval = goal.interval || "Daily"; // Add interval, default to "Daily"

  // Message based on achievement status
  let achievementMessage;
  if (achieved) {
    if (currentProgress > goalTarget) {
      achievementMessage = "Super work, goal achieved and more!";
    } else {
      achievementMessage = "Well done, goal achieved!";
    }
  } else {
    achievementMessage = "Unfortunately, goal is not achieved.";
  }

  return (
    <Card className="relative mx-auto w-full max-w-[290px] transition-all hover:-translate-y-1">
      <CardHeader className="mt-10 py-2 text-center">
        <CardTitle>{goalType.charAt(0).toUpperCase() + goalType.slice(1)}</CardTitle>
        <CardDescription>{goalDescriptions[goalType]}</CardDescription>
        <span className="absolute -top-[38px] end-1/2 translate-x-1/2 rounded-full border-4 border-background bg-primary p-3 shadow-sm outline outline-1 outline-border">
          {goalIcons[goalType]}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-7 text-sm">
        {/* Conditional rendering: show spinner if currentProgress is loading */}
        {currentProgress === undefined ? (
          <FaSpinner className="text-5xl animate-spin text-muted-foreground/50" /> // Loading spinner
        ) : (
          <>
            <span className="text-4xl font-extrabold text-muted-foreground/50">
              {formatNumber(currentProgress)} / {formatNumber(goalTarget)}
            </span>
            {/* Display the unit and interval here */}
            <span className="mt-2 text-xl font-semibold text-orange-500">
              {goalUnits[goalType]} ({interval}) {/* Display unit and interval */}
            </span>
            <span className="mt-3 text-sm font-medium text-center">
              {achievementMessage}
            </span>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalsCard;
