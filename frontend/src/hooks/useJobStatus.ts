import { useEffect, useState } from "react";
import { getJobStatus } from "../services/image.service";

export const useJobStatus = (jobId?: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        }

        retries++;

        if (retries >= MAX_RETRIES) {
          clearInterval(interval);
          setError("Processing timeout");
          setLoading(false);
        }
      } catch (err) {
        clearInterval(interval);
        setError("Server error");
        setLoading(false);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  return { data, error, loading };
};