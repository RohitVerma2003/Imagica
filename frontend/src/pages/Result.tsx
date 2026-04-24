import { useParams } from "react-router-dom";
import { useJobStatus } from "../hooks/useJobStatus";
import { downloadImage } from "../services/image.service";
import Loader from "../components/Loader";

export default function Result() {
  const { jobId } = useParams();

  const { data, error, loading } = useJobStatus(jobId);

  if (!jobId) return <p className="p-10">Invalid Job</p>;

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader />
        <p className="text-slate-400">
          {data?.state === "active"
            ? "Processing your image..."
            : "Waiting in queue..."}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-2xl text-center">
          <h1 className="text-xl mb-4 text-red-400">
            {error}
          </h1>

          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (data?.state === "failed") {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-2xl text-center">
          <h1 className="text-xl mb-4 text-red-400">
            Processing failed ❌
          </h1>

          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-2xl text-center">
        <h1 className="text-2xl mb-4">
          Your Image is Ready 🎉
        </h1>

        <button
          onClick={async () => {
            try {
              await downloadImage(jobId);
            } catch (err: any) {
              alert(err.message);
            }
          }}
          className="bg-green-500 px-6 py-3 rounded-xl"
        >
          Download Image
        </button>
      </div>
    </div>
  );
}