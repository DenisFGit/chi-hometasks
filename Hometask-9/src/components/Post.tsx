// import type { Exhibit } from "../layouts/StripePage"
import { Box } from "@mui/material"

interface Props {
    item: {
        id: string,
        createdAt: string,
        imageUrl: string,
        description: string,
        commentCount: number
    }
}

const Post = ({ item }: Props) => {
    return (
        <Box className="stripe__post"
            sx={{
                padding: '15px',
                bordeRadius: '8px',
                backgroundColor: '#e7fe50'
            }}>
            <div>Created: {item.createdAt}</div>
            <img src={item.imageUrl} alt="image unavailable" />
            <p>
                Description:{" "}
                {item.description.length > 100
                    ? item.description.slice(0, 100)
                    : item.description}
            </p>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <p>Comments: {item.commentCount}</p>
                <button>show comments</button>
            </Box>
        </Box>
    )
}

export default Post