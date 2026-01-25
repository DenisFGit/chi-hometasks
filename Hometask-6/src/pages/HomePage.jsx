import React, { useContext } from "react";
import { ThemeContext } from "../components/ThemeProvider.jsx";

import { Box, Typography } from "@mui/material";

import rick from '../img/rick.jpg';

const HomePage = () => {

    const { isDark } = useContext(ThemeContext);

    return (
        <Box
            sx={{
                backgroundColor: isDark ? '#919191' : 'white',
                color: isDark ? '#fff' : 'black',
                height: '100vh',
            }}
        >
            <Typography variant="h1" fontSize={40} textAlign={'center'}>Rick and Morty app</Typography>
            <Box
                component="img"
                sx={{
                    borderRadius: '8px',
                    display: 'block',
                    margin: '16px auto 0 auto',
                }}
                alt="The house from the offer."
                src={rick}
            />
        </Box>
    )
}

export default HomePage;