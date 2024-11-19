import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const LogMenu = () => {
  const navigate = useNavigate();

  const handleSelectChange = (value) => {
    switch (value) {
      case "workout":
        navigate("/log/selectworkout"); // Workout activity page
        break;
      case "sleep":
        navigate("/log/sleep"); // Sleeping hours log page
        break;
      case "weight":
        navigate("/log/weight"); // Weight log page
        break;
      case "water":
        navigate("/log/water"); // Water log page
        break;
      case "steps":
        navigate("/log/steps"); // Steps log page
        break;
      case "calories":
        navigate("/log/calories"); // Calories log page (intake/burned)
        break;
      default:
        break;
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an activity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Activities</SelectLabel>
          <SelectItem value="workout">Workout</SelectItem>
          <SelectItem value="sleep">Sleeping hours</SelectItem>
          <SelectItem value="weight">Weight</SelectItem>
          <SelectItem value="water">Water</SelectItem>
          <SelectItem value="steps">Steps</SelectItem>
          <SelectItem value="calories">Calories</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LogMenu;
