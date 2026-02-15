import { Box } from "@mui/material"
import type { User } from '../store/slices/userSlice';

interface Props {
    comment: {
        id: number,
        createdAt: string,
        text: string,
        user: User

    }
}

const Comment = ({ comment }: Props) => {

    const formattedDate = new Date(comment.createdAt).toLocaleString();


    return (
        <Box sx={{
            bgcolor: 'pink',
            padding: '8px',
            borderRadius: '8px',
        }}>
            <p>Created: {formattedDate}</p>
            <Box>
                <p>User: {comment.user.username}</p>
                <p>Description: {comment.text}</p>
            </Box>
        </Box>
    )
}

export default Comment