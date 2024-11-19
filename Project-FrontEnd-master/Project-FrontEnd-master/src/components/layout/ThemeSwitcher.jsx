import { Button } from "@/components/ui/button"; // Ensure you're using your Shadcn button component
import { useTheme } from "../../lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			onClick={toggleTheme}
			variant="secondary"
			// size="icon"
			className="rounded-full aspect-square p-0 size-10"
		>
			{theme === "light" ? (
				<MoonIcon className="h-[1.2rem] w-[1.2rem]  transition-all dark:rotate-0" />
			) : (
				<SunIcon className="h-[1.2rem] w-[1.2rem] " />
			)}
		</Button>
	);
};

export default ThemeSwitcher;
