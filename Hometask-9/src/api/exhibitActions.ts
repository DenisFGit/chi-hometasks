import apiClient from "./axiosInstance";

export interface Post {
    file: File | null,
    description: string
}

export const getAllExhibits = (page = 1) =>
    apiClient.get(`/api/exhibits?page=${page}`);


// export const createPost = (data: Post) => {
//     return apiClient.post("/api/exhibits", data);
// }

export const createPost = (post: FormData) =>
    apiClient.post("/api/exhibits", post);