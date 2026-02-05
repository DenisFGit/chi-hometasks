import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';
import { login, register } from '../../api/userActions.ts';

export interface User {
    id: string;
    name: string;
}

export interface UserState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    token: localStorage.getItem("accessToken"),
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

            console.log(res.data);
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

            console.log(res.data);
            return res.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(err.response?.data?.message || "Register failed");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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
                    name: action.payload.userName
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
                    name: action.payload.username,
                };

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;