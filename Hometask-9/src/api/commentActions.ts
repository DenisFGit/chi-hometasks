import apiClient from "./axiosInstance";

export const getComments = async (comment_id: number) => {
    return apiClient.get(`/api/exhibits/${comment_id}/comments`)
}
