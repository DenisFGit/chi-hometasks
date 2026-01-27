import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage.tsx';
import AboutPage from '../pages/AboutPage.tsx';
import HeroPage from '../pages/HeroPage.tsx';
import Navigation from './Navigation.tsx';
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
