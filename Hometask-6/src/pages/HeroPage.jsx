import React from "react";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ThemeContext } from "../components/ThemeProvider.jsx";

const HeroPage = () => {

    const { id } = useParams();
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(false);

    const { isDark } = useContext(ThemeContext);

    const fetchHero = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            const data = await response.json();
            setHero(data);
            setLoading(false);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    useEffect(() => {
        fetchHero(id);
    }, [id]);

    if (!hero) {
        return <p>Loading hero</p>
    }

    return (
        <div className="hero-item"
            style={{
                backgroundColor: isDark ? "#919191" : "white",
                height: '100vh',
                color: isDark ? 'white' : 'black'
            }}>
            {loading ? 'Loading hero' : null}
            {hero
                ? <div>
                    <img className='heroe-item__img' src={hero.image} />
                    <div className="heroe-item__desc">
                        <p><span className=" heroe-item__field">Name</span>: {hero.name}  </p>
                        <p><span className="heroe-item__field">Status</span>: {hero.status} </p>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default HeroPage;