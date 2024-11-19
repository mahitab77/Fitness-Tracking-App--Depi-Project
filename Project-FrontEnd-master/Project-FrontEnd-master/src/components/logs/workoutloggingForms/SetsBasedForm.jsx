import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * SetsBasedForm - A form to log a workout based on sets and reps.
 */
const SetsBasedForm = () => {
  const { register } = useFormContext(); // Use form context from React Hook Form
  const [sets, setSets] = useState([1, 2, 3]); // Default to 3 sets

  // Function to add a new set
  const addSet = () => {
    setSets((prevSets) => [...prevSets, prevSets.length + 1]);
  };

  return (
    <div>
      {/* Render sets dynamically */}
      {sets.map((setNo, index) => (
        <div key={setNo} className="flex items-center mb-2 space-x-4">
          {/* Set Number (hidden input to send set number) */}
          <input
            type="hidden"
            {...register(`sets[${index}].setNo`)} // Register setNo for each set
            value={setNo} // Automatically assign set number based on the loop index
          />
          <h4 className="font-bold">Set {setNo}:</h4>

          {/* Reps Input */}
          <div className="flex items-center space-x-2">
            <Label htmlFor={`set${setNo}-reps`}>Reps:</Label>
            <Input
              id={`set${setNo}-reps`}
              type="number"
              {...register(`sets[${index}].reps`, {
                valueAsNumber: true,
                min: { value: 0, message: "Reps cannot be negative" },
              })}
              className="border border-gray-300 p-2 w-32"
              placeholder="Enter reps"
            />
          </div>

          {/* Intensity Dropdown */}
          <div className="flex items-center space-x-2">
            <Label htmlFor={`intensity${setNo}`}>Intensity:</Label>
            <select
              id={`intensity${setNo}`}
              {...register(`sets[${index}].intensity`)}
              className="border border-gray-300 p-2 w-32"
              defaultValue="medium"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      ))}

      {/* Button to add more sets */}
      <Button onClick={addSet} type="button" className="mt-4 mb-4">
        Add More Sets
      </Button>
    </div>
  );
};

export default SetsBasedForm;
