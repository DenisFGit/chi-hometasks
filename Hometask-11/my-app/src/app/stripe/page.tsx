
import { getAllExhibits } from "../../api/exhibitActions";
import Post from "@/src/components/Post";
import Image from "next/image";
import { User } from "@/src/store/slices/userSlice";
import { Box } from "@mui/material";
// import { headers } from 'next/headers';

import Pagination from '../../components/Pagination';

interface PostData {
    id: number;
    createdAt: string;
    imageUrl: string;
    description: string;
    commentCount: number;
    user: User
}

interface PageProps {
    searchParams?: Promise<{
        page?: string;
    }>;
}

const StripePage = async ({ searchParams }: PageProps) => {

    const resolvedSearchParams = await searchParams;

    const pageNum = parseInt(resolvedSearchParams?.page || "1");

    const data = await getAllExhibits(pageNum);

    const posts: PostData[] = data.data.data;
    const lastPage: number = data.data.lastPage;

    const increment = pageNum < lastPage ? pageNum + 1 : pageNum;
    const decrement = pageNum > 1 ? pageNum - 1 : pageNum;


    if (!posts || posts.length === 0) {
        return (
            <div>There are no exhibits available</div>
        )
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '40px' }}>Stripe page</h1>
            <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Posts</h2>
            <Pagination
                pageNum={pageNum}
                lastPage={lastPage}
                increment={increment}
                decrement={decrement}
                path={'/stripe'}
            />

            <div className="flex flex-col gap-2 mt-[20px]">
                <Box sx={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    backgroundColor: '#0dae15',
                    padding: '15px',
                    borderRadius: '8px'

                }}>
                    {posts.map((item) => (
                        <Post key={item.id} item={item} />
                    ))}
                </Box>
            </div>
            <Pagination
                pageNum={pageNum}
                lastPage={lastPage}
                increment={increment}
                decrement={decrement}
                path={'/stripe'}
            />
        </div >
    );
};

export default StripePage;

