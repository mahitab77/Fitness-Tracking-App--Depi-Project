import { useState, useEffect } from "react";
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
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

const CalBurned = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [burn, setBurn] = useState("");
  const [startDate, setStartDate] = useState("");
  const userId = session.id;
  const [isFromDb, setIsFromDb] = useState(false);
  const [goalDetails, setGoalDetails] = useState({});
  const [error, setError] = useState("");

  // Set the current date automatically if no start date is found in DB
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setStartDate(today);
  }, []);

  useEffect(() => {
    const fetchBurnGoal = async () => {
      try {
        const response = await api.get(`/goals?userId=${userId}`);
        const goals = response.data;
        const burnGoal = goals.find((goal) => goal.goalType === "burn");
        console.log(burnGoal);
        if (burnGoal) {
          setIsFromDb(true);
          setGoalDetails(burnGoal);
          setBurn(burnGoal.quantity || "");
          setStartDate(
            burnGoal.startDate
              ? new Date(burnGoal.startDate).toISOString().split("T")[0]
              : "",
          );
        }
      } catch (error) {
        console.error("Error fetching burn goal:", error);
      }
    };

    fetchBurnGoal();
  }, [userId]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!burn || !startDate) {
      setError("Please fill all required fields.");
      return;
    }

    // Add the new goal
    try {
      const newGoal = {
        userId,
        goalType: "burn",
        quantity: burn,
        startDate,
        interval: "daily",
      };

      console.log(newGoal);

      if (isFromDb) {
        const response = await api.put(`/goals/${goalDetails._id}`, newGoal);
        console.log(response);
      } else {
        const response = await api.post(`/goals`, newGoal);
        console.log(response);
      }

      // Navigate to Goals page after saving
      navigate("/goals");
    } catch (error) {
      console.error("Error saving burn goal:", error);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Set Your Daily Burn Goal</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSave}>
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Calories Burn/Day:</Label>
                  <Input
                    type="number"
                    name="burn"
                    value={burn}
                    onChange={(e) => setBurn(e.target.value)}
                    placeholder="Enter daily burn goal"
                  />
                </div>

                {/* New Start Date Field */}
                <div
                  className="flex cursor-pointer flex-col space-y-1.5"
                  onClick={() => document.getElementById("startDate").focus()} // Focus on the input when clicking anywhere in the div
                >
                  <Label htmlFor="startDate">Start Date:</Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onFocus={(e) => e.target.showPicker()} // Show date picker when focused
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

export default CalBurned;
