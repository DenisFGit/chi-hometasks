import apiClient from "./axiosInstance";

export interface Post {
    file: File | null,
    description: string
}

export const getAllExhibits = (page = 1, limit = 10) =>
    apiClient.get(`/api/exhibits?page=${page}&limit=${limit}`);


export const createPost = (post: FormData) =>
    apiClient.post("/api/exhibits", post);

export const getMyExhibits = (page = 1, limit = 10) => {
    return apiClient.post(`/api/exhibits/my-posts?page=${page}&limit=${limit}`)
}

