import { Link } from "react-router-dom";

const services = [
  { name: "Compress Image", path: "/compress" },
  { name: "Resize Image", path: "/resize" },
];

export default function Services() {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-8">Services</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Link
            key={service.name}
            to={service.path}
            className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-orange-400 transition"
          >
            <h2 className="text-xl">{service.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}