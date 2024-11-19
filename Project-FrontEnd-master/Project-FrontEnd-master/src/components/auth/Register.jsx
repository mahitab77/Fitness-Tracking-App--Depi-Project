import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import axios from "axios";
import api from "../../authContext/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "name must be at least 2 characters long")
      .max(50, "name must be less than 50 characters"),

    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female"]), // Restricts gender to either 'male' or 'female'

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be less than 100 characters"),

    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
      .max(100, "Confirm password must be less than 100 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This targets where the error message should appear.
  });

function Register() {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // const deployedUrl = "https://project-back-end-delta.vercel.app/api";
    // const localUrl = "http://localhost:5000/api";

    console.log(values);
    

    api
      .post(`auth/register`, values, { withCredentials: true })
      .then((response) => {
        // eslint-disable-next-line no-unused-vars
        const data = response.data;

        navigate("/login"); // Redirect to login or any other page
      })
      .catch((err) => {
        // Handle error
        if (err.response) {
          console.log("Error response:", err.response.data.message);
        } else if (err.request) {
          console.log("Error request:", err.request);
        } else {
          console.log("Error message:", err.message);
        }
      })
      .finally(() => {
        // console.log(values);
      });
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Form {...form} className="w-full">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Max well" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Your Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default Register;
