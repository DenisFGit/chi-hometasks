// import { fetchPosts } from "../store/slices/exhibitSlices";
// import type { Dispatch, SetStateAction } from "react";
// import { nextPage, prevPage } from "../store/slices/exhibitSlices";

import { useAppSelector } from "../store/hooks";
import { Box, Button } from "@mui/material";

interface PaginationProps {
    pageNum: number;
    lastPage: number;
    increment: () => void;
    decrement: () => void;
}


const Pagination: React.FC<PaginationProps> = ({ pageNum, lastPage, increment, decrement }) => {

    // const total = useAppSelector((state) => state.exhibits.totalPages);
    // const page = useAppSelector((state) => state.exhibits.page);

    const loading = useAppSelector((state) => state.exhibits.isLoading);


    // const dispatch = useAppDispatch();

    return (

        <Box className="pagination"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '20px'
            }}>
            <Button
                variant="contained"
                onClick={decrement}
                disabled={loading || pageNum === 1}>
                prev
            </Button>
            <div style={{ fontSize: '20px' }}>{pageNum}</div>
            <Button
                variant="contained"
                onClick={increment}
                disabled={loading || pageNum === lastPage}>

                next
            </Button>
        </Box>
        // <Box className="pagination"
        //     sx={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         gap: '20px',
        //         marginTop: '20px'
        //     }}>
        //     <Button variant="contained" onClick={() => { dispatch(prevPage()) }}>
        //         prev
        //     </Button>
        //     <div style={{ fontSize: '20px' }}>{page}</div>
        //     <Button variant="contained" onClick={() => { dispatch(nextPage()) }}>
        //         next
        //     </Button>
        // </Box>
    )
}

export default Pagination