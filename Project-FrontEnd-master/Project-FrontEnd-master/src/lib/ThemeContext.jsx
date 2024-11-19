import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light");
	const [isLoaded, setIsLoaded] = useState(false);

	// Load theme from localStorage
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.classList.add(savedTheme); // Add the class for the saved theme
		}
	}, []);

	// Save theme to localStorage whenever it changes
	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("theme", theme);
		}
		document.documentElement.classList.toggle("dark", theme === "dark"); // Add/remove class based on the theme
		document.documentElement.classList.toggle("light", theme === "light"); // Add/remove class based on the theme

		setIsLoaded(true);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
