import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom"; // Removed useLocation as userId is hardcoded
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import api from "../../authContext/api";
import { useAuth } from "../../hooks/use-auth";

const WeightLog = () => {
  const { session } = useAuth();

  const [weightValue, setWeightValue] = useState(""); // State to track the input of weight kgs
  const [logDate, setLogDate] = useState(""); // State to track the log date
  const [successMessage, setSuccessMessage] = useState(""); // State to track the success message
  const [errorMessage, setErrorMessage] = useState(""); // State to track error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
  const navigate = useNavigate(); // For navigation

  // Hardcoded userId for testing purposes
  const userId = session.id

  // Set today's date as the default value for the log date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setLogDate(today); // Set the logDate state to today's date
  }, []); // Runs only once when the component is mounted

  // Handler for weight input changes
  const handleWeightChange = (e) => {
    setWeightValue(e.target.value);
  };

  // Handler for log date input changes
  const handleDateChange = (e) => {
    setLogDate(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate that both weightValue and logDate are provided
    if (!weightValue || !logDate) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    const logData = {
      userId,
      logDate,
      logType: "weight",
      valueLogged: weightValue, // Weight kgs
      metric: "kgs", // Metric field as required by the schema
    };

    try {
      setIsSubmitting(true); // Disable the button to prevent multiple submissions
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(`/logs?userId=${userId}`, logData);

      // On success, set the success message
      // console.log("Log response:", response.data); // For debugging purposes
      setSuccessMessage("Weight log has been saved successfully!");
      setErrorMessage(""); // Clear any previous errors

      // Optionally, reset the form
      setWeightValue("");
      setLogDate(new Date().toISOString().split("T")[0]); // Reset the date to today's date again
    } catch (error) {
      console.error("Error saving log:", error); // For debugging purposes
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while saving the weight log.",
      );
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request is done
    }
  };

  // Debugging log to check if the success message is being set
  // console.log("Success Message:", successMessage); // For debugging purposes

  return (
    <div className="container mx-auto mt-10 flex justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-orange-500">
            Log Weight Kgs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display success message */}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {/* Display error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Weight Kgs Input */}
          <div>
            <Label htmlFor="weightValue" className="text-sm">
              Enter Weight Kgs:
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="weightValue"
                type="number"
                min="0"
                placeholder="Enter weight kgs"
                value={weightValue}
                onChange={handleWeightChange}
                className="flex-1"
              />
              <span className="text-orange-500">kgs</span> {/* Metric text */}
            </div>
          </div>

          {/* Log Date Input */}
          <div>
            <Label htmlFor="logDate" className="text-sm">
              Select Date:
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
          {/* Back button */}
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>

          {/* Submit button */}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Log Weight"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WeightLog;
