import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getComments, createComment } from '../../api/commentActions';

interface CommentPayload {
    postId: number;
    text: string;
}

interface User {
    id: number;
    username: string;
}

export interface CommentInterface {
    id: number;
    text: string;
    createdAt: string;
    user: User;
}

interface CommentState {
    commentsByPostId: {
        [postId: number]: CommentInterface[];
    };
    isLoading: boolean;
    error: boolean | null;
}

const initialState: CommentState = {
    commentsByPostId: {},
    isLoading: false,
    error: null,
};

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (postId: number) => {
        const response = await getComments(postId);

        return {
            postId,
            comments: response.data
        };
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async ({ postId, text }: CommentPayload) => {
        const response = await createComment(postId, text);

        return {
            postId,
            comment: response.data as CommentInterface
        };
    }
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;

                const { postId, comments } = action.payload;

                state.commentsByPostId[postId] = comments;


            })
            .addCase(fetchComments.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })

            //Add comment

            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;

                const { postId, comment } = action.payload;

                if (!state.commentsByPostId[postId]) {
                    state.commentsByPostId[postId] = [];
                }

                state.commentsByPostId[postId].push(comment);
            })
            .addCase(addComment.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
});

export default commentSlice.reducer;