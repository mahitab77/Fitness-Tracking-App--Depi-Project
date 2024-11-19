import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

function LogIn() {
  const navigate = useNavigate();
  const { session, login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSbmit = () => {
    login(credentials);
  };

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session]);

  return (
    <div className="grid h-full place-content-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={credentials.email}
              required
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button className="w-full" onClick={handleSbmit}>
            Sign in
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LogIn;
