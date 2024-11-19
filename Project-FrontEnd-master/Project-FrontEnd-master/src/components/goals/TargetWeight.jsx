import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

const TargetWeight = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const startDateRef = useRef(null);

  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [durationMonths, setDurationMonths] = useState("");
  const [weightDuration, setWeightDuration] = useState("");
  const [durationPeriod, setDurationPeriod] = useState("");
  const [startDate, setStartDate] = useState("");

  const [selectedOption, setSelectedOption] = useState("target-weight");
  const userId = session.id;
  const [isFromDb, setIsFromDb] = useState(false);
  const [goalDetails, setGoalDetails] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Set start date to today's date
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);

    const fetchWeightGoals = async () => {
      try {
        const response = await api.get(`/goals?userId=${userId}`);
        const goals = response.data;
        const weightGoal = goals.find((goal) => goal.goalType === "weight");
        console.log(weightGoal);

        if (weightGoal) {
          setIsFromDb(true);
          setGoalDetails(weightGoal);
          setCurrentWeight(weightGoal.currentValue || "");
          setTargetWeight(weightGoal.targetValue || "");
          setDurationMonths(weightGoal.duration || "");
          setWeightDuration(weightGoal.quantity || "");
          setDurationPeriod(weightGoal.interval || "");
          setStartDate(
            weightGoal.startDate
              ? new Date(weightGoal.startDate).toISOString().split("T")[0]
              : today,
          );
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchWeightGoals();
  }, [userId]);

  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);

    // Calculate end date based on start date and duration
    const end = new Date(date);
    if (selectedOption === "target-weight" && durationMonths) {
      end.setMonth(end.getMonth() + parseInt(durationMonths));
    } else if (selectedOption === "weight-duration" && durationPeriod) {
      if (durationPeriod === "week") {
        end.setDate(end.getDate() + parseInt(weightDuration) * 7);
      } else if (durationPeriod === "month") {
        end.setMonth(end.getMonth() + parseInt(weightDuration));
      }
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);

    // Reset other fields based on selected option
    if (option === "target-weight") {
      setWeightDuration("");
      setDurationPeriod("");
    } else if (option === "weight-duration") {
      setTargetWeight("");
      setDurationMonths("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      selectedOption === "target-weight" &&
      (!currentWeight || !targetWeight || !durationMonths || !startDate)
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (
      selectedOption === "weight-duration" &&
      (!currentWeight || !weightDuration || !durationPeriod || !startDate)
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (selectedOption === "target-weight") {
      setWeightDuration(null);
      setDurationPeriod(null);
    }

    if (selectedOption === "weight-duration") {
      setTargetWeight(null);
      setDurationMonths(null);
    }

    const newGoal = {
      userId,
      goalType: "weight",
      currentValue: currentWeight,
      targetValue: targetWeight,
      duration: durationMonths,
      quantity: weightDuration,
      interval: durationPeriod,
      startDate,
    };

    try {
      if (isFromDb) {
        const response = await api.put(`/goals/${goalDetails._id}`, newGoal);
        console.log(response);
      } else {
        const response = await api.post(`/goals`, newGoal);
        console.log(response);
      }

      navigate("/goals");
    } catch (error) {
      console.error("Error saving Weight goal:", error);
    }
  };

  const { control } = useForm({
    defaultValues: {
      DurationPeriod: durationPeriod,
    },
  });

  return (
    <>
      <div className="flex sm:items-start sm:justify-start md:h-screen md:items-center md:justify-center lg:items-center lg:justify-center xl:items-center xl:justify-center 2xl:items-center 2xl:justify-center">
        <Card className="mx-auto w-full max-w-[900px] p-4">
          <CardHeader>
            <CardTitle>Lose or Gain Weight</CardTitle>
          </CardHeader>

          <CardContent>
            <form>
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Current Weight:</Label>
                  <Input
                    type="number"
                    name="currentWeight"
                    value={currentWeight || ""}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    placeholder="Enter Current Weight"
                  />
                </div>

                <div className="mb-4 flex flex-col sm:items-center sm:space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  {/* Target Weight Option */}
                  <div
                    className={`mx-auto w-full rounded-lg p-4 shadow-lg sm:w-3/4 md:w-1/2 ${
                      selectedOption === "target-weight"
                        ? "bg-secondary-100 text-secondary-foreground"
                        : "bg-secondary-100 text-secondary-foreground/30"
                    }`}
                  >
                    <div className="flex items-center">
                      <Input
                        type="radio"
                        id="target-weight"
                        name="option"
                        value="target-weight"
                        checked={selectedOption === "target-weight"}
                        onChange={() => handleOptionChange("target-weight")}
                        className="mr-2 h-4 w-4"
                      />
                      <Label htmlFor="target-weight">
                        Target Weight in duration
                      </Label>
                    </div>
                    <div className="mt-2">
                      <div className="mb-2">
                        <Label>Target Weight:</Label>
                        <Input
                          type="number"
                          min="0"
                          name="targetWeight"
                          value={
                            selectedOption === "target-weight"
                              ? targetWeight || ""
                              : ""
                          }
                          onChange={(e) => setTargetWeight(e.target.value)}
                          disabled={selectedOption !== "target-weight"}
                        />
                      </div>
                      <div>
                        <Label>Duration (months):</Label>
                        <Input
                          type="number"
                          min="0"
                          name="durationMonths"
                          value={
                            selectedOption === "target-weight"
                              ? durationMonths || ""
                              : ""
                          }
                          onChange={(e) => setDurationMonths(e.target.value)}
                          disabled={selectedOption !== "target-weight"}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Weight Duration Option */}
                  <div
                    className={`mx-auto w-full rounded-lg p-4 shadow-lg sm:w-3/4 md:w-1/2 ${
                      selectedOption === "weight-duration"
                        ? "bg-secondary-100 text-secondary-foreground"
                        : "bg-secondary-100 text-secondary-foreground/30"
                    } `}
                  >
                    <div className="flex items-center">
                      <Input
                        type="radio"
                        id="weight-duration"
                        name="option"
                        value="weight-duration"
                        checked={selectedOption === "weight-duration"}
                        onChange={() => handleOptionChange("weight-duration")}
                        className="mr-2 h-4 w-4"
                      />
                      <Label htmlFor="weight-duration">
                        Weight to be lost or gained in the duration
                      </Label>
                    </div>
                    <div className="mt-2">
                      <div className="mb-2">
                        <Label>Weight/Duration:</Label>
                        <Input
                          type="number"
                          min="0"
                          name="weightDuration"
                          value={
                            selectedOption === "weight-duration"
                              ? weightDuration || ""
                              : ""
                          }
                          onChange={(e) => setWeightDuration(e.target.value)}
                          disabled={selectedOption !== "weight-duration"}
                        />
                      </div>
                      <div>
                        <Label>Duration:</Label>
                        <Controller
                          name="selectPeriod"
                          control={control}
                          render={({ field }) => (
                            <div className="space-y-2">
                              <div className="flex items-center gap-5">
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setDurationPeriod(value);
                                  }}
                                  defaultValue={field.value || durationPeriod}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select period" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Period</SelectLabel>
                                      <SelectItem value="week">Week</SelectItem>
                                      <SelectItem value="month">
                                        Month
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="cursor-pointer space-y-2"
                  onClick={() => document.getElementById("startDate").focus()}
                >
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={handleStartDateChange}
                    ref={startDateRef}
                    onClick={() => startDateRef.current.showPicker()}
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button type="submit" variant="outline" onClick={handleSave}>
              Save
            </Button>
            <Button type="button" onClick={() => navigate("/goals")}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
export default TargetWeight;
