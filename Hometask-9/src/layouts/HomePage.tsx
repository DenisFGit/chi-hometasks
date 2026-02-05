
import { useEffect, useState } from "react";

import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/userSlice";

import apiClient from "../api/axiosInstance";

import './HomePage.scss';

interface User {
    username: string,
    id: number
}


interface Data {
    createdAt: string,
    description: string,
    imageUrl: string,
    user: User,
    commentCount: number
}

const HomePage = () => {

    const [posts, setPosts] = useState<Data[]>([]);

    const dispatch = useAppDispatch();

    const fetchData = async () => {
        try {
            const response = await apiClient.get('https://playground.zenberry.one/api/exhibits/my-posts?page=1&limit=10');
            const { data } = response.data;
            // console.log(data);
            setPosts(data);
            return response;

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    console.log(posts);

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="home">
            <h1 className="home__title">Home page</h1>
            <h3 className="home__subtitle">My Posts</h3>
            <div className="home__content">
                {
                    posts && posts.length > 0
                        ? posts.map((post, i) => {
                            return <div className="home__post" key={i}>
                                <p>Created: {post.createdAt}</p>
                                <img src={post.imageUrl} alt={post.description} />
                                <p>Description: {post.description}</p>
                                <p>Comment: {post.commentCount}</p>
                            </div>
                        })
                        : null
                }
            </div>
            <button className="home__btn" onClick={() => dispatch(logout())}>Log out</button>
        </div>
    )
}

export default HomePage