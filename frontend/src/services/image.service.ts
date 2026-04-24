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

export const downloadImage = async (jobId: string) => {
    try {
        const response = await api.get(`/download/${jobId}`, {
            responseType: "blob",
        });

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        // 🔥 Extract filename from headers
        let fileName = "download";

        const disposition = response.headers["content-disposition"];

        if (disposition) {
            const match = disposition.match(/filename="?([^"]+)"?/);
            if (match && match[1]) {
                fileName = match[1];
            }
        }

        link.download = fileName; // ✅ correct filename with extension

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err: any) {
        const message =
            err.response?.data?.message || "Download failed. Try again.";

        throw new Error(message);
    }
};