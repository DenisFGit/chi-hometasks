import { Box, Button } from "@mui/material"
import type { User } from '../store/slices/userSlice';

interface Props {
    comment: {
        id: number,
        createdAt: string,
        text: string,
        user: User
    },
    user: User | null,
    itemId: number,
    handleDeleteComment: (postId: number, commentId: number) => void,
}

const Comment = ({ comment, handleDeleteComment, user, itemId }: Props) => {

    const formattedDate = new Date(comment.createdAt).toLocaleString();

    return (

        <Box sx={{
            bgcolor: 'pink',
            padding: '8px',
            borderRadius: '8px',
        }}>
            <p>Created: {formattedDate}</p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Box>
                    <p>User: {comment.user.username}</p>
                    <p>Description: {comment.text}</p>
                </Box>
                {user?.id === comment.user.id
                    ? <Button variant="contained"
                        onClick={() => handleDeleteComment(itemId, comment.id)}>
                        Delete
                    </Button>
                    : null
                }
            </Box>
        </Box>
    )
}

export default Comment