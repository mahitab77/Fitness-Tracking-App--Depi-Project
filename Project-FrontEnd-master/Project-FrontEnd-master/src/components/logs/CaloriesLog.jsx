import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

const CaloriesLog = () => {
  const { session } = useAuth();

  // State to track the log type (either "intake" or "burn")
  const [logType, setLogType] = useState("intake");

  // State to track the calories input by the user (either intake or burn)
  const [caloriesValue, setCaloriesValue] = useState("");

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // State to track the date for the log entry, initialized to today's date
  const [logDate, setLogDate] = useState(getTodayDate());

  // State to track success and error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State to track if the form is being submitted (disables button during submission)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // For navigation (e.g., going back after submitting the form)
  const navigate = useNavigate();

  // Hardcoded userId for now (can be replaced with dynamic value later)
  const userId = session.id;

  // Handler to update calories input when the user types a value
  const handleCaloriesChange = (e) => {
    setCaloriesValue(e.target.value);
  };

  // Handler to update the log date when the user selects a date
  const handleDateChange = (e) => {
    setLogDate(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate that both the calories value and the date are provided
    if (!caloriesValue || !logDate) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    // Prepare the log data to be sent to the backend
    const logData = {
      userId,
      logDate,
      logType, // logType will be either "intake" or "burn" based on radio selection
      valueLogged: caloriesValue, // Calories input (intake or burn)
      metric: "calories", // Metric for the log, which is "calories"
    };

    try {
      // Disable the submit button to prevent multiple submissions
      setIsSubmitting(true);

      // Send a POST request to save the log data
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(`/logs?userId=${userId}`, logData);

      // On success, show a success message and reset the form
      setSuccessMessage("Calories log has been saved successfully!");
      setErrorMessage(""); // Clear any previous errors
      setCaloriesValue(""); // Clear the calories input field
      setLogDate(getTodayDate()); // Reset the log date to today's date

      // console.log("Log response:", response.data); // For debugging purposes
    } catch (error) {
      // In case of an error, show an error message
      // console.error("Error saving log:", error); // For debugging purposes
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while saving the calories log.",
      );
    } finally {
      // Re-enable the submit button after the request is done
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-orange-500">
            Log Calories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display success message */}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          {/* Display error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Radio buttons to select log type (intake or burn) */}
          <div>
            <Label className="mb-4 block text-sm text-gray-600">
              Select Log Type
            </Label>
            <RadioGroup
              // Set logType to "intake" or "burn" based on the radio button selection
              onValueChange={setLogType}
              value={logType} // logType is directly set to "intake" or "burn"
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intake" id="intake" />
                <Label htmlFor="intake">Calories Intake</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="burn" id="burn" />
                <Label htmlFor="burn">Calories Burned</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Calories Input */}
          <div>
            <Label htmlFor="caloriesValue" className="text-sm">
              {logType === "intake"
                ? "Enter Calories Intake"
                : "Enter Calories Burned"}
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="caloriesValue"
                type="number"
                min="0"
                placeholder={
                  logType === "intake"
                    ? "Enter calories intake value"
                    : "Enter calories burned value"
                } // Dynamic placeholder based on logType
                value={caloriesValue}
                onChange={handleCaloriesChange}
                className="flex-1"
              />
              <span className="text-orange-500">calories</span>{" "}
              {/* Metric text */}
            </div>
          </div>

          {/* Log Date Input */}
          <div>
            <Label htmlFor="logDate" className="text-sm">
              Select Date
            </Label>
            <Input
              id="logDate"
              type="date"
              value={logDate}
              onChange={handleDateChange}
              className="w-full"
            />
          </div>
        </CardContent>

        {/* Form Buttons */}
        <CardFooter className="flex justify-between space-x-2">
          {/* Back button to go back to the previous page */}
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>

          {/* Submit button (disabled while the form is submitting) */}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Log Calories"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CaloriesLog;
