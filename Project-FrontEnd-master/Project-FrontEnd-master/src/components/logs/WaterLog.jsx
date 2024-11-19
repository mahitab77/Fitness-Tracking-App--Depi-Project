import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

const WaterLog = () => {
    const { session } = useAuth();
  const [waterValue, setWaterValue] = useState(""); // State to track the input of water liters
  const [logDate, setLogDate] = useState(""); // State to track the log date
  const [successMessage, setSuccessMessage] = useState(""); // State to track the success message
  const [errorMessage, setErrorMessage] = useState(""); // State to track error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
  const navigate = useNavigate(); // For navigation

  // Hardcoded userId for testing purposes
  const userId = session.id

  // Set today's date as default value for logDate
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setLogDate(today); // Set the logDate state to today's date
  }, []); // Runs only once when the component is mounted

  // Handler for water input changes
  const handleWaterChange = (e) => {
    setWaterValue(e.target.value);
  };

  // Handler for log date input changes
  const handleDateChange = (e) => {
    setLogDate(e.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate that both waterValue and logDate are provided
    if (!waterValue || !logDate) {
      setErrorMessage("Please fill out all the fields.");
      return;
    }

    const logData = {
      userId,
      logDate,
      logType: "water",
      valueLogged: waterValue, // Water liters
      metric: "liters", // Metric field as required by the schema
    };

    try {
      setIsSubmitting(true); // Disable the button to prevent multiple submissions
      // eslint-disable-next-line no-unused-vars
      const response = await api.post(
        `/logs?userId=${userId}`,
        logData
      );

      // On success, set the success message
      // console.log("Log response:", response.data); // For debugging purposes
      setSuccessMessage("Water log has been saved successfully!");
      setErrorMessage(""); // Clear any previous errors

      // Optionally, reset the form
      setWaterValue("");
      setLogDate(new Date().toISOString().split("T")[0]); // Reset the date to today's date again
    } catch (error) {
      console.error("Error saving log:", error); // For debugging purposes
      setErrorMessage(
        error.response?.data?.message || "An error occurred while saving the water log."
      );
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request is done
    }
  };

  return (
    <div className="container mx-auto flex justify-center mt-10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-orange-500">Log Water in Liters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display success message */}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          {/* Display error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Water liters Input */}
          <div>
            <Label htmlFor="waterValue" className="text-sm">
              Enter Water Liters:
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="waterValue"
                type="number"
                min="0"
                placeholder="Enter water in liters"
                value={waterValue}
                onChange={handleWaterChange}
                className="flex-1"
              />
              <span className="text-orange-500">liters</span> {/* Metric text */}
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

        <CardFooter className="flex justify-between space-x-2">
          {/* Back button */}
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>

          {/* Submit button */}
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Log Water"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WaterLog;
