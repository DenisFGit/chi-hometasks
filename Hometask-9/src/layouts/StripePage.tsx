
import { useEffect } from "react";

import { fetchPosts } from "../store/slices/exhibitSlices";
import { useAppDispatch, useAppSelector } from "../store/hooks";
// import Post from "../components/Post";

import './StripePage.scss';

const StripePage = () => {

    const posts = useAppSelector((state) => state.exhibits.items);
    const page = useAppSelector((state) => state.exhibits.page);

    const dispatch = useAppDispatch();


    const fetchExhibits = async () => {
        try {
            dispatch(fetchPosts(page));
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    console.log(posts);

    useEffect(() => {
        fetchExhibits();
    }, [])

    return (
        <div className="stripe">
            <h1 className="stripe__title">StripePage</h1>

            <div className="stripe__content">
                {
                    posts && posts.length > 0
                        ? posts.map((item, i) => {
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