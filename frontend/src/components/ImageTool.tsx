import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "./UploadBox";
import Slider from "./Silder";
import { uploadImage } from "../services/image.service";
import type { ImageType } from "../types/image";

interface Props {
  type: ImageType;
}

export default function ImageTool({ type }: Props) {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    if (type === "compress") {
      formData.append("quality", String(quality));
    }

    if (type === "resize") {
      formData.append("width", String(width));
      formData.append("height", String(height));
    }

    try {
      setLoading(true);
      const res = await uploadImage(formData);
      navigate(`/result/${res.jobId}`);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl w-full max-w-xl shadow-xl">

        <h1 className="text-3xl font-semibold mb-6 capitalize text-center">
          {type} Image
        </h1>

        <UploadBox onChange={(e : any) => setFile(e.target.files[0])} />

        <div className="mt-6 space-y-4">
          {type === "compress" && (
            <Slider
              label="Quality"
              value={quality}
              min={1}
              max={100}
              onChange={setQuality}
            />
          )}

          {type === "resize" && (
            <>
              <Slider
                label="Width"
                value={width}
                min={100}
                max={2000}
                onChange={setWidth}
                unit="px"
              />
              <Slider
                label="Height"
                value={height}
                min={100}
                max={2000}
                onChange={setHeight}
                unit="px"
              />
            </>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Upload & Process"}
        </button>
      </div>
    </div>
  );
}