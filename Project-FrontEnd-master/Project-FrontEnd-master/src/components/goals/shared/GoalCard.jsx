import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { FaRegEye } from "react-icons/fa6";
import {
  FaGlassWaterDroplet,
  FaPersonRunning,
  FaWeightScale,
} from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import { GiFruitBowl, GiNightSleep } from "react-icons/gi";
import { IoFootsteps } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GoalCard = ({ goal, index, setShowModal, setGoalToDelete }) => {
  const navigate = useNavigate();

  const handleEdit = (event, goal, index) => {
    event.stopPropagation(); // Prevents movement when pressed
    const targetPath =
      goal.goalType === "steps"
        ? "/goals/steps"
        : goal.goalType === "sleep"
          ? "/goals/sleep"
          : goal.goalType === "water"
            ? "/goals/water"
            : goal.goalType === "burn"
              ? "/goals/burn"
              : goal.goalType === "intake"
                ? "/goals/intake"
                : goal.goalType === "workout"
                  ? "/goals/workouts"
                  : "/goals/target-weight";

    navigate(targetPath, {
      state: {
        goal: {
          ...goal,
          startDate: goal.startDate || "", // Ensure startDate is included
        },
        index,
        mode: "edit",
      },
    });
  };

  return (
    <>
      <div key={index + "goal"} className="relative">
        <div className="flex items-center justify-center">
          <Card className="relative flex h-[300px] w-[500px] flex-col justify-between">
            <CardHeader>
              <CardTitle>
                {goal.goalType === "steps"
                  ? "Steps Goal"
                  : goal.goalType === "sleep"
                    ? "Sleep Goal"
                    : goal.goalType === "water"
                      ? "Water Goal"
                      : goal.goalType === "intake"
                        ? "Calorie Intake Goal"
                        : goal.goalType === "burn"
                          ? "Calories Burn Goal"
                          : goal.goalType === "workout"
                            ? "Workout Goal"
                            : "Target Weight Goal"}
              </CardTitle>
            </CardHeader>

            <span className="absolute -top-[39px] end-1/2 translate-x-1/2 rounded-full border-4 border-background bg-primary p-3 shadow-sm outline outline-1 outline-border">
              <span className="text-4xl text-background">
                {goal.goalType === "steps" ? (
                  <IoFootsteps className="text-3xl text-background" />
                ) : goal.goalType === "sleep" ? (
                  <GiNightSleep className="text-3xl text-background" />
                ) : goal.goalType === "water" ? (
                  <FaGlassWaterDroplet className="text-3xl text-background" />
                ) : goal.goalType === "intake" ? (
                  <GiFruitBowl className="text-3xl text-background" />
                ) : goal.goalType === "burn" ? (
                  <ImFire className="text-3xl text-background" />
                ) : goal.goalType === "workout" ? (
                  <FaPersonRunning className="text-3xl text-background" />
                ) : (
                  <FaWeightScale className="text-3xl text-background" />
                )}
              </span>
            </span>

            <CardContent>
              {goal.goalType === "steps" && (
                <p className="mb-4 mt-2">
                  You are aiming to reach{" "}
                  <span className="font-bold">{goal.quantity} steps/day</span>
                </p>
              )}

              {goal.goalType === "sleep" && (
                <p className="mb-4 mt-2">
                  You are aiming to sleep{" "}
                  <span className="font-bold">{goal.quantity} hours/day</span>
                </p>
              )}

              {goal.goalType === "water" && (
                <p className="mb-4 mt-2">
                  You are aiming to drink{" "}
                  <span className="font-bold">{goal.quantity} liters/day</span>
                </p>
              )}

              {goal.goalType === "burn" && (
                <p className="mb-4 mt-2">
                  You are aiming to burn{" "}
                  <span className="font-bold">
                    {goal.quantity} calories/day
                  </span>
                </p>
              )}

              {goal.goalType === "intake" && (
                <p className="mb-4 mt-2">
                  You are aiming to consume{" "}
                  <span className="font-bold">
                    {goal.quantity} calories/day
                  </span>
                </p>
              )}

              {goal.goalType === "workout" && (
                <>
                  {goal.quantity && !goal.duration && (
                    <p className="mb-2">
                      You are aiming to complete{" "}
                      <span className="font-bold">
                        {goal.quantity} workouts/{goal.interval}
                      </span>
                    </p>
                  )}
                  {goal.duration && !goal.quantity && (
                    <p className="mb-2">
                      You are aiming to workout for{" "}
                      <span className="font-bold">
                        {goal.duration} hours/{goal.interval}
                      </span>
                    </p>
                  )}
                </>
              )}

              {goal.goalType === "weight" && (
                <>
                  <p>
                    {goal.currentValue > goal.targetValue ? (
                      <p className="font-bold">
                        You are aiming to lose weight.
                      </p>
                    ) : (
                      <p>You are aiming to gain weight.</p>
                    )}
                    Your current weight is{" "}
                    <span className="font-bold">{goal.currentValue} kg</span>
                  </p>
                  {goal.targetValue && (
                    <p>
                      Your target weight is{" "}
                      <span className="font-bold">{goal.targetValue} kg</span>
                    </p>
                  )}
                  <p>
                    Duration:{" "}
                    {goal.targetValue ? (
                      <span className="font-bold">{goal.duration} month</span>
                    ) : (
                      <span className="font-bold">
                        {goal.quantity} kg/{goal.interval}
                      </span>
                    )}
                  </p>
                </>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={(event) => handleEdit(event, goal, index)}
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={(event) => {
                  event.stopPropagation(); // Prevents movement when pressed
                  setShowModal(true);
                  setGoalToDelete(index);
                }}
              >
                Delete
              </Button>

              <Button
                className="absolute right-1 top-1"
                variant="gost"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate("/goals/goal-preview", {
                    state: {
                      goalType: goal.goalType,
                      goal,
                    },
                  });
                }}
              >
                <FaRegEye className="text-lg text-muted-foreground hover:text-primary" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GoalCard;
