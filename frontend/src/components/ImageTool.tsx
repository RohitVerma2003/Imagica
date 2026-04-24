import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "./UploadBox";
import Slider from "./Silder";
import { uploadImage } from "../services/image.service";
import type { ImageType } from "../types/image";
import { services } from "../config/services";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  type: ImageType;
}

const DEFAULT_CROP: Crop = { unit: "px", x: 50, y: 50, width: 200, height: 200 };

export default function ImageTool({ type }: Props) {
  const service = services.find((s) => s.id === type);
  if (!service) return <p>Invalid service</p>;

  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [angle, setAngle] = useState(0);
  const [format, setFormat] = useState("jpg");
  const [crop, setCrop] = useState<Crop>(DEFAULT_CROP);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const navigate = useNavigate();
  const isCrop = service.id === "crop";

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    if (service.fields.includes("quality")) formData.append("quality", String(quality));
    if (service.fields.includes("width") && !isCrop) formData.append("width", String(width));
    if (service.fields.includes("height") && !isCrop) formData.append("height", String(height));
    if (service.fields.includes("angle")) formData.append("angle", String(angle));
    if (service.fields.includes("format")) formData.append("format", format);

    if (isCrop) {
      const imgEl = imgRef.current;
      if (!imgEl) return alert("Image not ready");

      const scaleX = imgEl.naturalWidth / imgEl.clientWidth;
      const scaleY = imgEl.naturalHeight / imgEl.clientHeight;

      formData.append("x", String(Math.round(crop.x * scaleX)));
      formData.append("y", String(Math.round(crop.y * scaleY)));
      formData.append("width", String(Math.round(crop.width * scaleX)));
      formData.append("height", String(Math.round(crop.height * scaleY)));
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

        <UploadBox
          onChange={(e: any) => {
            const selectedFile = e?.target?.files?.[0];
            if (!selectedFile) return;
            setFile(selectedFile);
            setCrop(DEFAULT_CROP);
            setImagePreview(URL.createObjectURL(selectedFile));
          }}
        />

        {imagePreview && isCrop && (
          <div className="mt-6">
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
              <img
                ref={imgRef} // ✅ Attach ref here
                src={imagePreview}
                alt="preview"
                className="max-h-96 w-full object-contain rounded-xl"
              />
            </ReactCrop>
          </div>
        )}

        {/* ✅ Plain preview for non-crop services */}
        {imagePreview && !isCrop && (
          <div className="mt-6">
            <img
              src={imagePreview}
              alt="preview"
              className="max-h-96 w-full object-contain rounded-xl"
            />
          </div>
        )}

        <div className="mt-6 space-y-4">
          {service.fields.includes("quality") && (
            <Slider label="Quality" value={quality} min={1} max={100} onChange={setQuality} />
          )}
          {service.fields.includes("width") && !isCrop && (
            <Slider label="Width" value={width} min={100} max={2000} onChange={setWidth} />
          )}
          {service.fields.includes("height") && !isCrop && (
            <Slider label="Height" value={height} min={100} max={2000} onChange={setHeight} />
          )}
          {service.fields.includes("angle") && (
            <Slider label="Angle" value={angle} min={0} max={360} onChange={setAngle} />
          )}
          {service.fields.includes("format") && (
            <select
              onChange={(e) => setFormat(e.target.value)}
              className="w-full p-2 bg-slate-800 rounded-lg"
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
            </select>
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