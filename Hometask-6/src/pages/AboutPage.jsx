import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider.jsx";

import Typography from '@mui/material/Typography';

const AboutPage = () => {

    const { isDark } = useContext(ThemeContext);
    return (
        <div className="home"
            style={{
                backgroundColor: isDark ? "#919191" : "white",
                height: '100vh',
                color: isDark ? 'white' : 'black'
            }}>
            <Typography variant="h1" fontSize={40} textAlign={'center'}>About page</Typography>
        </div>
    )
}

export default AboutPage;