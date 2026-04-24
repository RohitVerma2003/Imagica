import { useParams } from "react-router-dom";
import { useJobStatus } from "../hooks/useJobStatus";
import { downloadImage } from "../services/image.service";
import Loader from "../components/Loader";

export default function Result() {
  const { jobId } = useParams();

  const data = useJobStatus(jobId);

  if (!jobId) return <p className="p-10">Invalid Job</p>;

  if (!data || data.state !== "completed") {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-2xl text-center">
        <h1 className="text-2xl mb-4">Your Image is Ready 🎉</h1>

        <a
          href={downloadImage(jobId)}
          className="bg-green-500 px-6 py-3 rounded-xl"
        >
          Download Image
        </a>
      </div>
    </div>
  );
}