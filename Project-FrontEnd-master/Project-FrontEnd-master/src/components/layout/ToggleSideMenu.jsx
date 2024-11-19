import {
	MdOutlineKeyboardDoubleArrowLeft,
	MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { Button } from "../ui/button";

const ToggleSideMenu = ({ isOpen, setIsOpen }) => {
	return (
		<Button
			size="icon"
			className="size-6 absolute -end-3 top-4  bg-background rounded-full border hover:border-primary/50"
			variant="gost"
			onClick={() => setIsOpen((prev) => !prev)}
		>
			{isOpen ? (
				<MdOutlineKeyboardDoubleArrowLeft size={16} />
			) : (
				<MdOutlineKeyboardDoubleArrowRight size={16} />
			)}
		</Button>
	);
};
export default ToggleSideMenu;
