'use client'
import { useEffect, useState, useCallback } from "react";
import Post from "@/src/components/Post";
import { Box } from "@mui/material";
import { useSearchParams, usePathname } from "next/navigation";
import apiClient from "../../api/axiosInstance";
import Pagination from '../../components/Pagination';

interface User {
    username: string,
    id: number
}

interface Data {
    id: number,
    createdAt: string,
    description: string,
    imageUrl: string,
    user: User,
    commentCount: number
}

const HomePage = () => {
    const [posts, setPosts] = useState<Data[]>([]);
    const [lastPage, setLastPage] = useState(1);

    const searchParams = useSearchParams();
    const pageNum = parseInt(searchParams.get("page") || "1");

    const pathname = usePathname();

    const increment = pageNum < lastPage ? pageNum + 1 : pageNum;
    const decrement = pageNum > 1 ? pageNum - 1 : pageNum;

    const fetchData = useCallback(async () => {
        const response = await apiClient.get(
            `/api/exhibits/my-posts?page=${pageNum}&limit=10`
        );
        setPosts(response.data.data);
        setLastPage(response.data.lastPage);
    }, [pageNum]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="home">
            <h1 className="text-center text-3xl">Home page</h1>
            <h3 className="text-center text-2xl">My Posts</h3>
            <Pagination
                pageNum={pageNum}
                lastPage={lastPage}
                increment={increment}
                decrement={decrement}
                path={pathname}
            />
            <div className="flex flex-col gap-2 mt-[20px]">
                <Box sx={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    padding: '15px',
                    backgroundColor: '#CC381B',
                    borderRadius: '8px'
                }}>
                    {posts.map((item) => (
                        <Post key={item.id} item={item} onRefresh={fetchData} />
                    ))}
                </Box>
            </div>
            <Pagination
                pageNum={pageNum}
                lastPage={lastPage}
                increment={increment}
                decrement={decrement}
                path={pathname}
            />
        </div>
    )
}

export default HomePage