import { useCallback, useEffect, useState } from "react";

export default function useScroll(threshold) {
	const [isScrolled, setIsScrolled] = useState(false);

	const onScroll = useCallback(() => {
		setIsScrolled(window.pageYOffset > threshold);
	}, [threshold]);

	useEffect(() => {
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [onScroll]);

	return isScrolled;
}
