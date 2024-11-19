import ThemeSwitcher from "@/components/layout/ThemeSwitcher";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <div className="flex w-full items-center justify-between border-b px-5 py-2 shadow">
      <Link to={"/"} className="font-bold">
        DashBoard
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <UserMenu />
      </div>
    </div>
  );
};
export default Header;
