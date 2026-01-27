import { useState } from "react";
import { ThemeContext } from "./themeContext";

type Props = {
    children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;