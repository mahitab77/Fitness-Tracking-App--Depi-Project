import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // ShadCN Avatar component
import LogMenu from "./LogMenu"; // LogMenu component for the upper part of the page
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // ShadCN Tabs components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ShadCN Select components for sorting dropdown
import LogsTable from "./LogsTable"; // Component to display logs data
import api from "../../authContext/api";
import { useAuth } from "../../hooks/use-auth";

// Main LogHome component
const LogHome = () => {
  const { session } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [logsData, setLogsData] = useState([]); // Stores fetched logs
  const [activeTab, setActiveTab] = useState("weight"); // Tracks the currently active tab
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors
  const [sortOrder, setSortOrder] = useState("newest"); // Default sorting order

  // Fetch logs based on the selected log type
  const fetchLogs = async (logType) => {
    setLoading(true); // Set loading state
    setError(null); // Reset error
    setLogsData([]); // Clear logs data before fetching new data

    try {
      let response;

      // Fetch workout logs if the active tab is "workout"
      if (logType === "workout") {
        response = await api.get(`workoutslogs?userId=${session.id}`);
      } else {
        // Fetch logs for other types (weight, steps, water, etc.)
        response = await api.get(`/logs/type/${logType}`, {
          params: {
            userId: session.id,
          },
        });
      }

      if (response.data && response.data.length > 0) {
        setLogsData(response.data); // Store fetched logs
      } else {
        console.log(`No logs found for log type: ${logType}`);
      }
    } catch (err) {
      console.log("Error fetching logs:", err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  // Function to sort logs by date
  const sortLogs = (logs, order) => {
    if (order === "newest") {
      return logs.sort((a, b) => new Date(b.logDate) - new Date(a.logDate)); // Sort from newest to oldest
    } else {
      return logs.sort((a, b) => new Date(a.logDate) - new Date(b.logDate)); // Sort from oldest to newest
    }
  };

  // useEffect to fetch logs whenever the active tab changes
  useEffect(() => {
    fetchLogs(activeTab); // Fetch logs for the active tab
  }, [activeTab]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="mt-8 rounded-md border border-gray-300 p-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-orange-500">
                Welcome {session.name}
              </h3>
              <p className="text-gray-500">Want to log your activities?</p>
            </div>

            {/* Log Menu for selecting different log types */}
            <div className="flex items-center justify-between">
              <LogMenu />
            </div>
          </div>
          {/* User Avatar */}
          <Avatar className="size-24">
            <AvatarImage
              src={
                session.avatar
                  ? `${backendUrl}${session.avatar}`
                  : "https://github.com/shadcn.png"
              }
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Tabs Section with Sorting Dropdown */}
      <div className="mt-10 rounded-md border border-gray-300 p-10 shadow-lg">
        <div className="mb-4 flex justify-between">
          <h3 className="font-bold text-orange-500">Logged Activities</h3>

          {/* Sorting Dropdown placed beside the tabs */}
          <Select
            onValueChange={(value) => setSortOrder(value)} // Set the selected sorting order
            defaultValue={sortOrder}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort Logs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest to Oldest</SelectItem>
              <SelectItem value="oldest">Oldest to Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs for different log types */}
        <Tabs
          defaultValue="weight"
          onValueChange={(value) => setActiveTab(value)} // Change active tab on selection
          className="w-full flex-1"
        >
          <TabsList className="mb-4 flex flex-wrap gap-2">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="sleep">Sleeping Hours</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="intake">Calories Intake</TabsTrigger>{" "}
            {/* Correct logType */}
            <TabsTrigger value="burn">Calories Burned</TabsTrigger>{" "}
            {/* Correct logType */}
            <TabsTrigger value="workout">Workouts</TabsTrigger>
          </TabsList>

          {/* Logs for each type - Sorted logs are passed */}
          <TabsContent value="weight">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="weight"
              loading={loading}
              error={error}
            />
          </TabsContent>

          <TabsContent value="steps">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="steps"
              loading={loading}
              error={error}
            />
          </TabsContent>

          <TabsContent value="sleep">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="sleep"
              loading={loading}
              error={error}
            />
          </TabsContent>

          <TabsContent value="water">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="water"
              loading={loading}
              error={error}
            />
          </TabsContent>

          <TabsContent value="intake">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="calories intake"
              loading={loading}
              error={error}
            />
          </TabsContent>

          <TabsContent value="burn">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="calories burned"
              loading={loading}
              error={error}
            />
          </TabsContent>

          <TabsContent value="workout">
            <LogsTable
              logs={sortLogs(logsData, sortOrder)}
              tableHead1="workouts"
              loading={loading}
              error={error}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LogHome;
