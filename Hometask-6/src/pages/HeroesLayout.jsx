import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./HeroesLayout.scss";

import HeroesPage from "./HeroesPage.jsx";

const HeroesLayout = () => {

    const location = useLocation();
    console.log(location);

    let layoutGrid = location.pathname === '/heroes'
        ? 'heroes-layout heroes-layout-location'
        : 'heroes-layout'

    return (
        <div className={layoutGrid}>
            <div className="heroes-layout__list">
                <HeroesPage />
            </div>

            {location.pathname === "/heroes"
                ? null
                : <div className="heroes-layout__details">
                    <Outlet />
                </div>
            }
        </div>
    );
};

export default HeroesLayout;