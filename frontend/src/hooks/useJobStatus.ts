import { useEffect, useState } from "react";
import { getJobStatus } from "../services/image.service";

export const useJobStatus = (jobId?: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!jobId) return;

        let retries = 0;
        const MAX_RETRIES = 30;

        const interval = setInterval(async () => {
            try {
                const res = await getJobStatus(jobId);
                setData(res);

                if (res.state === "completed" || res.state === "failed") {
                    clearInterval(interval);
                }

                retries++;

                if (retries >= MAX_RETRIES) {
                    clearInterval(interval);
                    setError("Processing timeout");
                }
            } catch (err) {
                console.error("Polling error:", err);
                clearInterval(interval);
                setError("Server error");
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [jobId]);

    return { data, error };
};