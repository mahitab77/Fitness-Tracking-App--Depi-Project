import { Link } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavLinks() {
  return (
    <>
      <div>
        <header className="sticky top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
          <h1 className="text-lg font-bold">Choose goals to set </h1>

          <div className="flex lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="icon">
                  <CgMenuGridR size={24} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Goals</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/goals/target-weight">Target weight</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/goals/steps">Steps</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/goals/sleep">Sleep</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/goals/water">Water</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/goals/intake">Calories intake/day</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/goals/burn">Calories burned/day</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/goals/workouts">Workouts</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              to="/goals/target-weight"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Target weight
            </Link>
            <Link
              to="/goals/steps"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Steps
            </Link>
            <Link
              to="/goals/sleep"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sleep
            </Link>
            <Link
              to="/goals/water"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Water
            </Link>
            <Link
              to="/goals/intake"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Calories intake/day
            </Link>
            <Link
              to="/goals/burn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Calories burned/day
            </Link>
            <Link
              to="/goals/workouts"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Workouts
            </Link>
          </nav>
        </header>
      </div>
    </>
  );
}
