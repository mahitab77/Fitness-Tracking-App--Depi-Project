import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const SideBarNav = ({ sideMenuBtns, isOpen }) => {
	const { pathname } = useLocation();
	const ActivePath = pathname.split("/")[1];
	return (
		<nav className=" flex-col flex gap-3 mt-10 w-full px-2">
			{sideMenuBtns.map((btn) => (
				<Button
					key={btn.title}
					asChild
					variant={isOpen ? "outline" : "gost"}
					className={`w-full ${
						"/" + ActivePath === btn.href
							? "border-primary"
							: (ActivePath === "") & (btn.href === "/")
							? "border-primary"
							: ""
					}`}
				>
					<Link
						to={btn.href}
						className={`flex  text-start gap-2 overflow-hidden !justify-start transition-all duration-500 ${
							!isOpen ? "!px-[5px]" : ""
						}`}
					>
						<span
							className={
								"/" + ActivePath === btn.href
									? "text-primary"
									: (ActivePath === "") & (btn.href === "/")
									? "text-primary"
									: ""
							}
						>
							{btn.icon}
						</span>
						<span>{btn.title}</span>
					</Link>
				</Button>
			))}
		</nav>
	);
};
export default SideBarNav;
