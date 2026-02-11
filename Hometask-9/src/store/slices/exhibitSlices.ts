import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { AxiosError } from 'axios';

import { getAllExhibits, createPost, getMyExhibits } from '../../api/exhibitActions';

import type { Post } from '../../api/exhibitActions';


interface User {
    id: number,
    username: string
}

export interface Exhibit {
    id: string;
    imageUrl: string,
    description: string;
    user: User,
    commentCount: number;
    createdAt: string;
}

export interface ExhibitState {
    items: Exhibit[];          // всі експонати
    myItems: Exhibit[];        // мої експонати
    current: Exhibit | null;   // експонат за id

    isLoading: boolean;
    error: boolean | null;

    // page: number;
    // totalPages: number;
}

const initialState: ExhibitState = {
    items: [],
    myItems: [],
    current: null,

    isLoading: false,
    error: null,

    // page: 1,
    // totalPages: 1,
};

export const fetchPosts = createAsyncThunk('exhibits/fetchAll', async (page: number) => {
    try {
        const res = await getAllExhibits(page);

        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error:' + error);
    }
});

export const fetchMyPosts = createAsyncThunk('exhibits/fetchMyPosts', async (page: number) => {
    try {
        const res = await getMyExhibits(page);

        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log('Error:' + error);
    }
});



export const sendPost = createAsyncThunk(
    'exhibits/sendPost',
    async (post: Post) => {

        try {
            const formData = new FormData();
            formData.append('image', post.file!);
            formData.append('description', post.description);

            const res = await createPost(formData);

            console.log(res.data);
            console.log('Post successfully created');

            return res.data;
        } catch (error) {
            console.log('Error:' + error);
        }
    }
)



const exhibitSlice = createSlice({
    name: 'exhibits',
    initialState,
    reducers: {
        // nextPage(state) {
        //     if (state.page < state.totalPages) {
        //         state.page += 1;
        //     }
        // },
        // prevPage(state) {
        //     if (state.page > 1) {
        //         state.page -= 1;
        //     }
        // },

    },
    extraReducers: (builder) => {
        builder
            //Get all posts
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;

            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.data;
                // state.page = +action.payload.page;
                // state.totalPages = action.payload.lastPage;
                // console.log(state.totalPages);
                // console.log(typeof (state.page));
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.error = true;
            })

            //Get my posts

            .addCase(fetchMyPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myItems = action.payload.data;
            })

            // Create post
            .addCase(sendPost.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
                console.log(action.payload);
            })
            .addCase(sendPost.rejected, (state) => {
                state.error = true;
            })

    }

})

// export const { nextPage, prevPage } = exhibitSlice.actions;
export default exhibitSlice.reducer;