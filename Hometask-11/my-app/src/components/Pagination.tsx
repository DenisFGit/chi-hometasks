import Link from "next/link";
import { Button } from "@mui/material";

interface Props {
    pageNum: number;
    lastPage: number;
    increment: number;
    decrement: number;
    path: string;
}

export default function Pagination({ pageNum, lastPage, increment, decrement, path }: Props) {


    return (
        <div className="pagination flex justify-center gap-4 my-4">
            {pageNum > 1 &&
                <Button variant="contained">
                    <Link href={`${path}?page=${decrement}`}>Prev</Link>
                </Button>}
            <span>{pageNum} / {lastPage}</span>
            {pageNum < lastPage &&
                <Button variant="contained">
                    <Link href={`${path}?page=${increment}`}>Next</Link>
                </Button>}
        </div>
    );
}