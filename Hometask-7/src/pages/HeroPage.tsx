import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useRequest } from "ahooks";
import { fetchHero } from "../api/services";

import useTheme from "../hooks/useTheme";

type RouteParams = {
    id: string;
};

const HeroPage = () => {

    const { id } = useParams<RouteParams>();
    const { isDark } = useTheme();

    const { data: hero, loading, run } = useRequest(fetchHero, {
        manual: true,
    });


    useEffect(() => {
        if (id) run(id);
    }, [id, run]);

    console.log(hero);

    if (loading) {
        return <p>Loading hero...</p>;
    }

    if (!hero) {
        return <p>No hero found</p>;
    }

    return (
        <div
            className="hero-item"
            style={{
                backgroundColor: isDark ? "#919191" : "white",
                height: "100vh",
                color: isDark ? "white" : "black",
            }}
        >
            <div>
                <img
                    className="heroe-item__img"
                    src={hero.image}
                    alt={hero.name}
                />
                <div className="heroe-item__desc">
                    <p>
                        <span className="heroe-item__field">Name</span>: {hero.name}
                    </p>
                    <p>
                        <span className="heroe-item__field">Status</span>: {hero.status}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroPage;