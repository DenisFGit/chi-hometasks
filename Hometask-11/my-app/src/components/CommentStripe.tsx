import Comment from "./Comment";
import { Box } from "@mui/material";
import type { CommentInterface } from "../store/slices/commentSlice";

interface Props {
    comments: CommentInterface[];
}

const CommentStripe = ({ comments }: Props) => {
    return (
        <Box sx={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        }}>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </Box>
    );
}

export default CommentStripe;