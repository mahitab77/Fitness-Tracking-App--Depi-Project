import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const SetInput = ({ watchOption, formSchema }) => {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      option: "sets",
      workoutNumber: 0,
      hours: 0,
      minutes: 0,
    },
  });
  // console.log(watchOption);

  return (
    <Controller
      name="workoutNumber"
      control={control}
      rules={{
        required: watchOption == "sets" ? "Please enter a number" : false,
        valueAsNumber: watchOption == "sets" ? true : false,
      }}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Enter number of workouts"
            disabled={watchOption != "sets"}
            className={watchOption != "sets" ? "opacity-50" : ""}
            type={watchOption == "sets" ? "number" : "text"}
            value={watchOption == "sets" ? field.value || "" : 0}
            onChange={(e) =>
              field.onChange(e.target.value ? parseInt(e.target.value, 10) : 0)
            } // Cast to number or null
          />
          {errors.workoutNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.workoutNumber.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default SetInput;
