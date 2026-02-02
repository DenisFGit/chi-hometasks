
import apiClient from "../api/axiosInstance";
import { useEffect, useState } from "react";
// import Post from "../components/Post";

import './StripePage.scss';

interface User {
    id: string,
    username: string
}

export interface Exhibit {
    id: string,
    imageUrl: string,
    description: string,
    user: User,
    commentCount: number
    createdAt: string
}

const StripePage = () => {

    const [exhibits, setExhibits] = useState<Exhibit[]>([])


    const fetchExhibits = async () => {
        try {
            const response = await apiClient.get('/api/exhibits');
            const { data } = response.data;
            console.log(data);
            setExhibits(data);
            return response;

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        fetchExhibits();
    }, [])

    return (
        <div className="stripe">
            <h1 className="stripe__title">StripePage</h1>

            <div className="stripe__content">
                {
                    exhibits && exhibits.length > 0
                        ? exhibits.map((item, i) => {
                            return <div key={i} className="stripe__post">
                                <div>Craeted: {item.createdAt}</div>
                                <img src={item.imageUrl} alt='image unavailable' />
                                <p>Description: {item.description}</p>
                                <p>Comment: {item.commentCount}</p>
                            </div>
                        })
                        : null
                }
            </div>
        </div>
    )
}

export default StripePage