import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const BusinessLogo = ({ isOpen }) => {
	return (
		<Avatar
			className={`${
				isOpen ? "size-20" : "size-10"
			} transition-all duration-500`}
		>
			<AvatarImage
				src="https://github.com/shadcn.png"
				alt="@shadcn"
			/>
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};
export default BusinessLogo;
