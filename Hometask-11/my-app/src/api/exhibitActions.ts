import apiClient from "./axiosInstance";
import axios from "axios";

const apiClientExhibit = axios.create({
    baseURL: "https://playground.zenberry.one",
});

export interface Post {
    file: File | null,
    description: string
}

export const getAllExhibits = (page = 1, limit = 10) =>
    apiClientExhibit.get(`/api/exhibits?page=${page}&limit=${limit}`);


export const createPost = (post: FormData) =>
    apiClient.post("/api/exhibits", post);

export const deleteExhibit = (id: number) => {
    return apiClient.delete(`/api/exhibits/${id}`)
}

export const getMyExhibits = (page = 1, limit = 10) => {
    return apiClient.post(`/api/exhibits/my-posts?page=${page}&limit=${limit}`)
}

