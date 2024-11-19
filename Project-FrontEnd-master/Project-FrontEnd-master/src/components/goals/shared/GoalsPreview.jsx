import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GoalsPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting goalType and goal from the state passed via route (if available).
  const { goalType, goal } = location.state || {};

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Goal Details</CardTitle>
          <CardDescription>Goal Overview</CardDescription>
        </CardHeader>

        <CardContent>
          {goal ? (
            <div>
              {goalType === "weight" ? (
                <>
                  {goal.goalType === "weight" && (
                    <>
                      <p>
                        {goal.currentValue > goal.targetValue ? (
                          <p className="font-bold">
                            You are aiming to lose weight.
                          </p>
                        ) : (
                          goal.currentValue <
                          goal.targetValue(
                            <p>You are aiming to gain weight.</p>,
                          )
                        )}
                        Your current weight is{" "}
                        <span className="font-bold">
                          {goal.currentValue} kg
                        </span>
                      </p>
                      {goal.targetValue && (
                        <p>
                          Your target weight is{" "}
                          <span className="font-bold">
                            {goal.targetValue} kg
                          </span>
                        </p>
                      )}
                      <p>
                        Duration:{" "}
                        {goal.targetValue ? (
                          <span className="font-bold">
                            {goal.duration} month
                          </span>
                        ) : (
                          <span className="font-bold">
                            {goal.quantity} kg/{goal.interval}
                          </span>
                        )}
                      </p>
                      <p>
                        Start Date:{" "}
                        <span className="font-bold">
                          {formatDate(goal.startDate)}
                        </span>
                      </p>
                    </>
                  )}
                </>
              ) : goalType === "steps" ? (
                <>
                  <p className="mb-2">
                    You are aiming to reach{" "}
                    <span className="font-bold">{goal.quantity} steps/day</span>
                  </p>
                  <p>Start Date: {formatDate(goal.startDate)}</p>
                </>
              ) : goalType === "sleep" ? (
                <>
                  <p className="mb-2">
                    You are aiming to sleep{" "}
                    <span className="font-bold">{goal.quantity} hours/day</span>
                  </p>
                  <p>Start Date: {formatDate(goal.startDate)}</p>
                </>
              ) : goalType === "water" ? (
                <>
                  <p className="mb-2">
                    You are aiming to drink{" "}
                    <span className="font-bold">{goal.quantity} liter/day</span>
                  </p>
                  <p>Start Date: {formatDate(goal.startDate)}</p>
                </>
              ) : goalType === "intake" ? (
                <>
                  <p className="mb-2">
                    You are aiming to consume{" "}
                    <span className="font-bold">
                      {goal.quantity} calories intake/day
                    </span>
                  </p>
                  <p>Start Date: {formatDate(goal.startDate)}</p>
                </>
              ) : goalType === "burn" ? (
                <>
                  <p className="mb-2">
                    You are aiming to burn{" "}
                    <span className="font-bold">
                      {goal.quantity} calories burned/day
                    </span>
                  </p>
                  <p>Start Date: {formatDate(goal.startDate)}</p>
                </>
              ) : goalType === "workout" ? (
                <>
                  {goal.goalType === "workout" && goal.quantity && (
                    <>
                      <p>
                        You are aiming to complete{" "}
                        <span className="font-bold">
                          {goal.quantity} workouts/{goal.interval}
                        </span>
                      </p>
                      <p>Start Date: {formatDate(goal.startDate)}</p>
                    </>
                  )}

                  {goal.goalType === "workout" && goal.duration && (
                    <>
                      <p>
                        You are aiming to workout for{" "}
                        <span className="font-bold">
                          {goal.duration} hours/{goal.interval}
                        </span>
                      </p>
                      <p>Start Date: {formatDate(goal.startDate)}</p>
                    </>
                  )}
                </>
              ) : (
                <p>No goal data available.</p>
              )}
            </div>
          ) : (
            <p>No goal data available.</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" onClick={() => navigate("/goals")}>
            Back to Goals
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
