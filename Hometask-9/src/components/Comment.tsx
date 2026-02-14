import { Box } from "@mui/material"

interface CommentUser {
    id: number,
    username: string
}

interface Props {
    comment: {
        id: number,
        createdAt: string,
        text: string,
        user: CommentUser

    }
}

const Comment = ({ comment }: Props) => {
    return (
        <Box sx={{
            bgcolor: 'pink',
            padding: '8px',
            borderRadius: '8px',
        }}>
            <p>CreateAt: {comment.createdAt}</p>
            <Box>
                <p>User: {comment.user.username}</p>
                <p>Description: {comment.text}</p>
            </Box>
        </Box>
    )
}

export default Comment