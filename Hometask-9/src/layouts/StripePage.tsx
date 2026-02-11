
import { useEffect, useState } from "react";

import { fetchPosts } from "../store/slices/exhibitSlices";
import { useAppDispatch, useAppSelector } from "../store/hooks";
// import Post from "../components/Post";

import Pagination from "../components/Pagination";

import './StripePage.scss';



const StripePage = () => {

    const [pageNum, setPageNum] = useState<number>(1);
    const [lastPage, setLastPge] = useState<number>(0)

    const posts = useAppSelector((state) => state.exhibits.items);
    // const page = useAppSelector((state) => state.exhibits.page);

    const dispatch = useAppDispatch();


    const increment = () => {
        if (pageNum < lastPage) {
            setPageNum(prev => prev + 1);
        }
    }

    const decrement = () => {
        if (pageNum > 1) {
            setPageNum(prev => prev - 1);
        }
    }

    console.log(pageNum);



    const fetchExhibits = async () => {
        try {
            const response = await dispatch(fetchPosts(pageNum)).unwrap();
            console.log(response);
            setPageNum(+response.page);
            setLastPge(response.lastPage);
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    // console.log(posts);
    console.log('page: ' + pageNum);

    useEffect(() => {
        fetchExhibits();
    }, [pageNum])

    return (
        <div className="stripe">
            <h1 className="stripe__title">StripePage</h1>

            <Pagination pageNum={pageNum} lastPage={lastPage} increment={increment} decrement={decrement} />

            <div className="stripe__content">
                {
                    posts && posts.length > 0
                        ? posts.map((item, i) => {
                            return <div key={i} className="stripe__post">
                                <div>Craeted: {item.createdAt}</div>
                                <img src={item.imageUrl} alt='image unavailable' />
                                <p>Description: {item.description.length > 100
                                    ? item.description.split('').splice(0, 50).join('')
                                    : item.description}</p>
                                <p>Comment: {item.commentCount}</p>
                            </div>
                        })
                        : null
                }
            </div>
            <Pagination pageNum={pageNum} lastPage={lastPage} increment={increment} decrement={decrement} />
        </div>
    )
}

export default StripePage