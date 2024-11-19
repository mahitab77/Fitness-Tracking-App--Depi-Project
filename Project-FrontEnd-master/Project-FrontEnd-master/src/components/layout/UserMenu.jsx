import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { logout, session } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage
            src={
              session?.avatar
                ? `${backendUrl}${session?.avatar}`
                : "https://github.com/shadcn.png"
            }
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="">
        <div className="space-y-3 text-center">
          <Button variant="outline" className="w-full" asChild>
            <Link to={"/setting"}>Setting</Link>
          </Button>
          {!session && (
            <Button className="w-full" asChild>
              <Link to={"/login"}>login</Link>
            </Button>
          )}
          {session && (
            <Button className="w-full" onClick={logout}>
              logout
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default UserMenu;
