import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Duration-based form component for logging a workout based on duration.
 */
const DurationBasedForm = () => {
  const { register } = useFormContext(); // Use form context from React Hook Form

  return (
    <div>
      {/* Log Start Time */}
      <div className="flex items-center mb-4">
        <Label htmlFor="startTime" className="w-32">
          Start Time:
        </Label>
        <Input
          id="startTime"
          type="time"
          {...register("logStartTime")}
          className="border border-gray-300 p-2 w-64"
        />
      </div>

      {/* Duration */}
      <div className="flex items-center mb-4">
        <Label htmlFor="duration" className="w-32">
          Duration (mins):
        </Label>
        <Input
          id="duration"
          type="number"
          {...register("duration")}
          className="border border-gray-300 p-2 w-64"
        />
      </div>

      {/* Intensity */}
      <div className="flex items-center mb-4">
        <Label htmlFor="durationIntensity" className="w-32">
          Intensity:
        </Label>
        <select
          id="durationIntensity"
          {...register("durationIntensity")}
          className="border border-gray-300 p-2 w-64"
          defaultValue="medium"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};

export default DurationBasedForm;
