import { services } from "../config/services";
import { useNavigate } from "react-router-dom";
import { serviceImages } from "../utils/serviceImages";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-10 grid md:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          onClick={() => navigate(`/tool/${service.id}`)}
          className="bg-slate-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition shadow-lg"
        >
          {/* 🔥 Image */}
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={serviceImages[service.image]}
              alt={service.title}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          {/* 🔥 Content */}
          <div className="p-5">
            <h2 className="text-xl font-semibold mb-2">
              {service.title}
            </h2>
            <p className="text-slate-400 text-sm">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}