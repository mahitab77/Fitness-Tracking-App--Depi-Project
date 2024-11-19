import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";

export default function WorkoutForm() {
  const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    const fields = [];
    for (let i = 1; i <= 7; i++) {
      fields.push({
        inputSet: `Set ${i}`,
        inputIntensity: `Intensity ${i}`,
      });
    }
    setInputFields(fields);
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      option: "sets",
      set1: "",
      set2: "",
      set3: "",
      set4: "",
      set5: "",
      set6: "",
      set7: "",
      intensity1: "",
      intensity2: "",
      intensity3: "",
      intensity4: "",
      intensity5: "",
      intensity6: "",
      intensity7: "",
      hours: "",
      minutes: "",
    },
  });

  const watchOption = watch("option");

  const onSubmit = (data) => {
    console.log("Form submitted successfully with:", data);
  };

  const validateFields = (field, index) => {
    if (field === `set${index}`) {
      if (!watch(`intensity${index}`)) {
        setError(`intensity${index}`, {
          type: "required",
          message: `Intensity ${index} is required when Set ${index} is filled`,
        });
      } else {
        clearErrors(`intensity${index}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6 p-4">
      {/* Set method */}
      <div className="space-y-3">
        <Label className="font-bold text-orange-500">
          Select the method for logging your workout
        </Label>
        <Controller
          name="option"
          control={control}
          rules={{ required: "Please select an option" }}
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                // Reset all fields when switching between options
                reset({
                  option: value, // Preserve the selected option
                  set1: "",
                  set2: "",
                  set3: "",
                  set4: "",
                  set5: "",
                  set6: "",
                  set7: "",
                  intensity1: "",
                  intensity2: "",
                  intensity3: "",
                  intensity4: "",
                  intensity5: "",
                  intensity6: "",
                  intensity7: "",
                  hours: "",
                  minutes: "",
                });
                field.onChange(value); // Update the selected option
              }}
              defaultValue={field.value}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <div className="w-full flex-1 space-y-2 rounded-md border border-gray-300 p-10">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="sets" id="sets" />
                  <Label htmlFor="sets" className="font-medium">
                    Sets
                  </Label>
                </div>

                {inputFields.map((input, index) => (
                  <div key={index}>
                    <h3 className="mt-5 font-bold">{input.inputSet}</h3>

                    {/* Rep input */}
                    <div className="mb-2 flex items-center">
                      <Label className="mr-2">Rep</Label>

                      <Controller
                        name={`set${index + 1}`}
                        control={control}
                        rules={{
                          required:
                            index + 1 == 1 && watchOption === "sets"
                              ? "Please enter a number for sets"
                              : false,
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter number of reps"
                            disabled={watchOption != "sets"}
                            className={
                              watchOption !== "sets" ? "opacity-50" : ""
                            }
                            type="number"
                            value={watchOption === "sets" ? field.value : ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              validateFields(`set${index + 1}`, index + 1);
                            }}
                          />
                        )}
                      />

                      {/* Intensity Input */}
                      <Label className="ml-8 mr-2">Intensity</Label>
                      <Controller
                        name={`intensity${index + 1}`}
                        control={control}
                        rules={{
                          required: watch(`set${index + 1}`)
                            ? `Intensity ${index + 1} is required`
                            : false,
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter intensity"
                            disabled={watchOption != "sets"}
                            className={
                              watchOption !== "sets" ? "opacity-50" : ""
                            }
                            type="number"
                            value={watchOption === "sets" ? field.value : ""}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <p className="text-sm text-gray-500">
                        Scale from 1 to 10
                      </p>
                    </div>
                    <div className="flex justify-end">
                      {errors[`intensity${index + 1}`] && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors[`intensity${index + 1}`].message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator
                orientation="vertical"
                className="hidden h-auto sm:block"
              />
              <Separator className="my-4 w-full sm:hidden" />

              {/* Duration method */}
              <div className="w-full flex-1 space-y-2 rounded-md border border-gray-300 p-10">
                <div className="mb-6 flex items-center space-x-3">
                  <RadioGroupItem value="duration" id="duration" />
                  <Label htmlFor="duration" className="font-medium">
                    Duration
                  </Label>
                </div>
                <Controller
                  name="hours"
                  control={control}
                  rules={{
                    required:
                      watchOption === "duration" ? "Please enter hours" : false,
                    min: { value: 0, message: "Hours cannot be negative" },
                    max: { value: 23, message: "Hours cannot exceed 23" },
                  }}
                  render={({ field }) => (
                    <div className="mt-5">
                      <Input
                        {...field}
                        placeholder="Enter the time in hours"
                        disabled={watchOption !== "duration"}
                        className={` ${watchOption !== "duration" ? "opacity-50" : ""}`}
                        type={watchOption === "duration" ? "number" : "text"}
                        value={watchOption === "duration" ? field.value : ""}
                        onChange={field.onChange}
                      />
                      {/* Error message for hours */}
                      {errors.hours && (
                        <p className="mb-6 mt-1 text-sm text-red-500">
                          {errors.hours.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Minutes Input */}
                <Controller
                  name="minutes"
                  control={control}
                  rules={{
                    required:
                      watchOption === "duration"
                        ? "Please enter minutes"
                        : false,
                    min: { value: 0, message: "Minutes cannot be negative" },
                    max: { value: 59, message: "Minutes cannot exceed 59" },
                  }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Enter the time in minutes"
                        disabled={watchOption !== "duration"}
                        className={` ${watchOption !== "duration" ? "opacity-50" : ""}`}
                        type={watchOption === "duration" ? "number" : "text"}
                        value={watchOption === "duration" ? field.value : ""}
                        onChange={field.onChange}
                      />
                      {/* Error message for minutes */}
                      {errors.minutes && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.minutes.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </RadioGroup>
          )}
        />
        {errors.option && (
          <p className="mt-1 text-sm text-red-500">{errors.option.message}</p>
        )}
      </div>
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
