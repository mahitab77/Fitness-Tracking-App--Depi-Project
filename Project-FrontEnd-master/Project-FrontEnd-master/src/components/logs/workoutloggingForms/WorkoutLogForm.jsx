import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import DurationBasedForm from "./DurationBasedForm";
import SetsBasedForm from "./SetsBasedForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import api from "../../../authContext/api";

/**
 * WorkoutLogForm - Main form to log workout based on either duration or sets/reps
 */
const WorkoutLogForm = () => {

  const methods = useForm();
  const { register, handleSubmit } = methods;

  const [selectedLogType, setSelectedLogType] = useState("duration");
  const [formError, setFormError] = useState(""); // State to hold validation error messages
  const [successMessage, setSuccessMessage] = useState(""); // State to hold success message
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Extract workoutId and userId from query params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const workoutId = searchParams.get("workoutId");
  const userId = searchParams.get("userId");

  /**
   * Function to handle form submission.
   * Validates the duration and other inputs, logs the data, and sends it to the backend API.
   */
  const onSubmit = async (data) => {
    // Clear any previous success message before submission
    setSuccessMessage("");

    // Duration-based validation
    if (selectedLogType === "duration" && (!data.duration || data.duration <= 0)) {
      setFormError("Duration must be greater than 0 for duration-based workouts.");
      return;
    }

    const formData = {
      userId,
      workoutId,
      logStartTime: data.logStartTime || "",
      duration: selectedLogType === "duration" ? data.duration : 0, // Set duration to 0 if using sets/reps
      caloriesBurned: data.caloriesBurned,
      logEndTime: selectedLogType === "duration"
        ? calculateEndTime(data.logStartTime, data.duration)
        : "",
      durationIntensity: selectedLogType === "duration" ? data.durationIntensity : "",
      setDetails: selectedLogType === "sets" ? data.sets : [],
    };

    try {
      // API call to save the workout log data
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(
        `/workoutslogs?userId=${userId}`,
        formData
      );
      // console.log("Workout Log Saved Successfully:", response.data);

      // Set success message
      setSuccessMessage("Workout log has been saved successfully!");

      // Clear form error if there was any
      setFormError(""); 
    } catch (error) {
      console.error("Error saving workout log:", error.response ? error.response.data : error.message);
      setFormError("An error occurred while saving the workout log.");
    }
  };

  /**
   * Function to calculate the log end time based on start time and duration
   */
  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return "";

    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + duration);

    return date.toTimeString().split(" ")[0].slice(0, 5);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 border border-gray-300 rounded-md">
        <h2 className="font-bold text-xl mb-4">Log Workout</h2>

        {/* Display success message */}
        {successMessage && (
          <div className="text-green-500 mb-4">
            {successMessage}
          </div>
        )}

        {/* Display validation error message */}
        {formError && (
          <div className="text-red-500 mb-4">
            {formError}
          </div>
        )}

        {/* Radio buttons to choose between Duration or Sets */}
        <div className="mb-6">
          <Label className="font-semibold">Select Workout Log Type:</Label>
          <RadioGroup
            value={selectedLogType}
            onValueChange={setSelectedLogType}
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center">
              <RadioGroupItem value="duration" id="duration" />
              <Label htmlFor="duration" className="ml-2">
                Duration-based log
              </Label>
              <span className="ml-2 text-sm text-gray-500">
                (Track workout duration in minutes)
              </span>
            </div>

            <div className="flex items-center">
              <RadioGroupItem value="sets" id="sets" />
              <Label htmlFor="sets" className="ml-2">
                Sets/Reps-based log
              </Label>
              <span className="ml-2 text-sm text-gray-500">
                (Track workout based on sets and reps)
              </span>
            </div>
          </RadioGroup>
        </div>

        {/* Conditionally render either Duration-based or Sets-based form */}
        {selectedLogType === "duration" ? (
          <DurationBasedForm />
        ) : (
          <SetsBasedForm />
        )}

        {/* Calories Burned Field (common for both forms) */}
        <div className="flex items-center mb-6">
          <Label htmlFor="caloriesBurned" className="w-32">
            Calories Burned:
          </Label>
          <div className="flex items-center">
            <Input
              id="caloriesBurned"
              type="number"
              {...register("caloriesBurned")}
              className="border border-gray-300 p-2 w-64"
            />
            <span className="ml-2 text-orange-500">kcal</span>
          </div>
        </div>

        {/* Submit and Back Buttons */}
        <div className="flex justify-between space-x-2">
          {/* Back Button (Styled like other forms) */}
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            Submit Workout Log
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default WorkoutLogForm;
