
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchMyPosts } from "../store/slices/exhibitSlices";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import Pagination from "../components/Pagination";
import Post from "../components/Post";

import './HomePage.scss';

const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNum = Number(searchParams.get("page")) || 1;

    const [lastPage, setLastPage] = useState<number>(1);

    const dispatch = useAppDispatch();

    const posts = useAppSelector((state) => state.exhibits.myItems);
    const isLoading = useAppSelector((state) => state.exhibits.isLoading);

    const user = useAppSelector((state) => state.user.user);
    console.log(user);


    const changePage = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    useEffect(() => {

        const fetchMyExhibits = async () => {
            try {
                const response = await dispatch(fetchMyPosts(pageNum)).unwrap();
                setLastPage(response.lastPage);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchMyExhibits();


    }, [pageNum, dispatch]);


    return (
        <div className="home">
            <h1 className="home__title">Home page</h1>
            <h3 className="home__subtitle">My Posts</h3>
            {isLoading
                ? <Box sx={{
                    textAlign: 'center',
                    fontSize: '30px'
                }}>
                    Loading exhibits...
                </Box>
                : <>
                    <Pagination pageNum={pageNum} lastPage={lastPage} changePage={changePage} />

                    <div className="home__content">
                        {
                            posts && posts.length > 0
                                ? posts.map((item) => {
                                    return <Post key={item.id} item={item} />
                                })
                                : null
                        }
                    </div>

                    <Pagination pageNum={pageNum} lastPage={lastPage} changePage={changePage} />

                </>}
        </div>
    )
}

export default HomePage