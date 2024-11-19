import { useState } from "react";
import useMediaQuery from "../../hooks/use-media-query";
import { useEffect } from "react";
import ToggleSideMenu from "./ToggleSideMenu";
import BusinessLogo from "./BusinessLogo";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import SideBarNav from "./SideBarNav";
import { PiTarget } from "react-icons/pi";

const sideMenuBtns = [
	{
		title: "Home",
		href: "/",
		icon: (
			<IoHomeOutline
				size={18}
				className="shrink-0"
			/>
		),
	},

	{
		title: "Goals",
		href: "/goals",
		icon: (
			<PiTarget
				size={18}
				className="shrink-0"
			/>
		),
	},
	{
		title: "Logging",
		href: "/log",
		icon: (
			<TfiWrite
				size={18}
				className="shrink-0"
			/>
		),
	},
	{
		title: "Setting",
		href: "/setting",
		icon: (
			<IoSettingsOutline
				size={18}
				className="shrink-0"
			/>
		),
	},
];

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(true);
	const { isMobile } = useMediaQuery();

	useEffect(() => {
		if (isMobile) {
			setIsOpen(false);
		}
	}, [isMobile]);

	return (
		<div
			className={`h-full border  shadow transition-all duration-500 relative flex flex-col  ${
				isMobile ? "w-12" : isOpen ? "w-60" : "w-12"
			}`}
		>
			{/* toggle side menu */}
			{!isMobile && (
				<ToggleSideMenu
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			)}

			{/* side menu btns */}
			<div className="py-4  h-full mt-10 overflow-hidden flex flex-col items-center">
				<BusinessLogo isOpen={isOpen} />

				<SideBarNav
					sideMenuBtns={sideMenuBtns}
					isOpen={isOpen}
				/>
			</div>
		</div>
	);
};
export default Sidebar;
