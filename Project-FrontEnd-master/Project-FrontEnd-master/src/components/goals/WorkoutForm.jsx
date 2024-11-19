import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

const formSchema = z
  .object({
    selectPeriod: z.string().min(1, "Please select a period."),
    option: z.enum(["quantity", "duration"], {
      required_error: "You need to select an option to set the goal.",
    }),
    workoutNumber: z.number().optional().nullable(),
    hours: z.number().optional().nullable(),
  })
  .refine(
    (data) =>
      (data.option === "quantity" && data.workoutNumber !== null) ||
      (data.option === "duration" && data.hours !== null),
    {
      path: ["option"],
      message: "Please fill in the required fields for the selected option.",
    },
  );

const Workouts = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [isFromDb, setIsFromDb] = useState(false);
  const [goalDetails, setGoalDetails] = useState({});
  const [selectPeriod, setSelectPeriod] = useState();
  const [startDate, setStartDate] = useState("");
  const userId = session.id;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectPeriod: "",
      option: "quantity",
      workoutNumber: null,
      hours: null,
    },
  });

  const watchOption = watch("option");
  // const watchSelectPeriod = watch("selectPeriod");

  // Set the current date automatically if no start date is found in DB
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
  }, []);

  useEffect(() => {
    const fetchWorkoutGoals = async () => {
      try {
        const response = await api.get(`/goals?userId=${userId}`);
        const goals = response.data;
        const workoutGoal = goals.find((goal) => goal.goalType === "workout");

        if (workoutGoal) {
          setIsFromDb(true);
          setGoalDetails(workoutGoal);

          setValue("selectPeriod", workoutGoal.interval || "");
          setValue("option", workoutGoal.duration ? "duration" : "quantity");
          setValue("workoutNumber", workoutGoal.quantity || null);
          setValue("hours", workoutGoal.duration || null);

          setStartDate(
            workoutGoal.startDate
              ? new Date(workoutGoal.startDate).toISOString().split("T")[0]
              : "",
          );
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchWorkoutGoals();
  }, [userId, setValue]);

  const handleSave = async (data) => {
    const newGoal = {
      userId,
      goalType: "workout",
      interval: data.selectPeriod,
      startDate: data.startDate,
      quantity: data.workoutNumber,
      duration: data.hours,
    };

    try {
      if (isFromDb) {
        await api.put(`/goals/${goalDetails._id}`, newGoal);
      } else {
        await api.post(`/goals`, newGoal);
      }

      navigate("/goals");
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    handleSave(data);
  };

  const handleRadioChange = (value) => {
    setValue("option", value);
    if (value === "quantity") {
      setValue("hours", null);
    } else {
      setValue("workoutNumber", null);
    }
  };

  const renderInputField = (name, placeholder, label, isDisabled) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder={placeholder}
            disabled={isDisabled}
            className={isDisabled ? "opacity-50" : ""}
            type="number"
            onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
          />
          {errors[name] && (
            <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
          )}
        </div>
      )}
    />
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-full max-w-[900px] p-4">
        <CardHeader>
          <CardTitle>Set Your Daily Workouts Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="selectPeriod"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <div className="flex items-center gap-5">
                    <Label>Select your goal period</Label>
                    <Select
                      value={field.value || selectPeriod} // Ensure the value comes from the form state or the selectPeriod state
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectPeriod(value);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Period</SelectLabel>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.selectPeriod && (
                    <p className="text-red-500">
                      {errors.selectPeriod.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-3">
              <Label>Select the method for setting your workout goal</Label>
              <Controller
                name="option"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value} // Set the value from the form state here
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRadioChange(value); // Handle the radio change
                    }}
                    className="flex flex-col gap-4 sm:flex-row"
                  >
                    <div className="w-full flex-1 space-y-2 rounded-md border border-gray-300 p-10">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="quantity" id="quantity" />
                        <Label htmlFor="quantity" className="font-medium">
                          Quantity
                        </Label>
                      </div>
                      {renderInputField(
                        "workoutNumber",
                        "Enter number of workouts",
                        "Quantity",
                        watchOption !== "quantity",
                      )}
                    </div>
                    <Separator
                      orientation="vertical"
                      className="hidden sm:block"
                    />
                    <div className="w-full flex-1 space-y-2 rounded-md border border-gray-300 p-10">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="duration" id="duration" />
                        <Label htmlFor="duration" className="font-medium">
                          Duration
                        </Label>
                      </div>
                      {renderInputField(
                        "hours",
                        "Enter hours of workout",
                        "Duration",
                        watchOption !== "duration",
                      )}
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            <div
              className="mt-4 cursor-pointer space-y-2"
              onClick={() => document.getElementById("startDate").focus()}
            >
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onFocus={(e) => e.target.showPicker()}
              />
            </div>
            <CardFooter className="mt-5 flex justify-between">
              <Button type="submit" variant="outline">
                Save
              </Button>
              <Button type="button" onClick={() => navigate("/goals")}>
                Cancel
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workouts;
