import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import HeroPage from '../pages/HeroPage.jsx';
import Navigation from './Navigation.jsx';
import HeroesLayout from '../pages/HeroesLayout.jsx';

import Box from "@mui/material/Box";

const drawerWidth = 240;

const App = () => {
    return (
        <Router>
            <Box sx={{ display: "flex", minHeight: "100vh", boxSizing: 'border-box' }}>
                <Navigation />
                <Box
                    component="main"
                    sx={{
                        ml: `${drawerWidth}px`,
                        width: '100%'
                    }}
                >
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/heroes" element={<HeroesLayout />}>
                            <Route path=":id" element={<HeroPage />} />
                        </Route>
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
