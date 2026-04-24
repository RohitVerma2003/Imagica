import { api } from "./api";

export const uploadImage = async (formData: FormData) => {
    const res = await api.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const getJobStatus = async (jobId: string) => {
    const res = await api.get(`/status/${jobId}`);
    return res.data;
};

export const downloadImage = (jobId: string) => {
    return `${api.defaults.baseURL}/download/${jobId}`;
};