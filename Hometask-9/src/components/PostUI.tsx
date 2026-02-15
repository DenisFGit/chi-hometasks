import { Box, Button, TextField } from "@mui/material"
import type { CommentInterface } from "../store/slices/commentSlice";
import type { User } from "../store/slices/userSlice";

import CommentStripe from "./CommentStripe";

interface Props {
    item: {
        id: number;
        createdAt: string;
        imageUrl: string;
        description: string;
        commentCount: number;
        user: User
    };
    onShowComments: (id: number) => void,
    handleDeletePost: (id: number) => void,
    comments: CommentInterface[],
    user: User | null,
    newComment: string;
    setNewComment: (text: string) => void;
    handleAddComment: () => void,
    isLoadingComments: boolean;
}

const PostUI = ({ item, onShowComments, handleDeletePost, comments, user, newComment, setNewComment, handleAddComment, isLoadingComments }: Props) => {

    const formattedDate = new Date(item.createdAt).toLocaleString();

    return (
        <Box
            className="stripe__post"
            sx={{
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#e7fe50'
            }}
        >
            <div>Created: {formattedDate}</div>

            <img src={item.imageUrl} alt="image unavailable" />

            <p>
                Description:{" "}
                {item.description.length > 100
                    ? item.description.slice(0, 100)
                    : item.description}
            </p>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <p>Comments: {item.commentCount}</p>
                <Box sx={{
                    display: 'flex',
                    gap: '10px'
                }}>
                    {item.commentCount > 0
                        ? <Button variant="contained" onClick={() => onShowComments(item.id)}>
                            {comments.length > 0 ? 'close comments' : 'show comments'}
                        </Button>
                        : null
                    }

                    {user?.id === item.user?.id && (
                        <Button variant="contained" onClick={() => handleDeletePost(item.id)}>Delete</Button>
                    )}
                </Box>
            </Box>

            {isLoadingComments
                ? <Box sx={{ marginTop: "10px", textAlign: "center" }}>
                    Loading comments...
                </Box>
                : comments.length > 0
                    ? <CommentStripe comments={comments} />
                    : null}

            {user && (
                <Box sx={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddComment}>
                        Add
                    </Button>
                </Box>
            )}


        </Box>
    );
};

export default PostUI;