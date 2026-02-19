import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { login, register, getMe } from '../../api/userActions';

export interface User {
    id: number;
    username: string;
}

export interface UserState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "user/login",
    async (data: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {

            const res = await login(data);

            localStorage.setItem("accessToken", res.data.access_token);

            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async (data: { username: string, password: string }, { rejectWithValue }) => {
        try {

            const res = await register(data);

            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || "Register failed");
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "user/me",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getMe();
            return res.data;
        } catch (error) {
            console.log("Error: " + error);
            return rejectWithValue("Not authorized");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },

        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;

            localStorage.removeItem("accessToken");
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    id: action.payload.userId,
                    username: action.payload.userName
                }
                state.token = action.payload.access_token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    id: action.payload.id,
                    username: action.payload.username,
                };
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            //Get my-profile

            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.token = null;
            })

    },
});

export const { logout, clearError, setToken } = userSlice.actions;
export default userSlice.reducer;