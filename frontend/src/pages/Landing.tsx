import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="text-center px-6 py-20">
      <h1 className="text-5xl font-bold mb-6">
        Powerful Image Processing
      </h1>

      <p className="text-slate-400 max-w-xl mx-auto mb-8">
        Compress, resize and optimize your images instantly with a scalable backend.
      </p>

      <Link
        to="/services"
        className="bg-orange-500 px-6 py-3 rounded-xl hover:bg-orange-600 transition"
      >
        Get Started
      </Link>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        {["Fast Processing", "Async Jobs", "Auto Cleanup"].map((item) => (
          <div
            key={item}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
          >
            <h3 className="font-semibold mb-2">{item}</h3>
            <p className="text-slate-400 text-sm">
              Built with scalable architecture.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}