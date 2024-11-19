import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAuth } from "../../hooks/use-auth";
import api from "../../authContext/api";

const BirthDayInput = () => {
  const { session } = useAuth();
  const [date, setDate] = useState(session.dateOfBirth);

  const sendDateToBackend = async () => {
    if (!date) return; // Prevent sending if no date selected
    console.log("first");

    try {
      const response = await api.patch(`/users/${session.id}`, {
        dateOfBirth: date,
      });
      console.log(response);

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = await response.data;
      setDate(data.dateOfBirth);
      window.location.reload(); // Refreshes the page

      console.log("Successfully sent date:", data);
    } catch (error) {
      console.error("Error sending date:", error);
    }
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
  };

  return (
    <div className="flex w-full gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] items-center justify-start gap-2 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect} // Use the new function
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button onClick={sendDateToBackend}>Change</Button>
    </div>
  );
};

export default BirthDayInput;
