import { useState } from "react";

export default function UploadBox({ onChange }:{onChange: any}) {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        onChange({ target: { files: e.dataTransfer.files } });
      }}
      className={`border-2 border-dashed rounded-2xl p-10 text-center transition
        ${dragging ? "border-orange-400 bg-slate-800" : "border-slate-700"}`}
    >
      <p className="text-slate-400">
        Drag & drop your image here or click to upload
      </p>
      <input
        type="file"
        className="mt-4"
        onChange={onChange}
      />
    </div>
  );
}