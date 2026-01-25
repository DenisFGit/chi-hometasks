import React, { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = (props) => {

    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark(!isDark);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;