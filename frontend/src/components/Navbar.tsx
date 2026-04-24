import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
      <Link to="/" className="text-xl font-bold text-orange-400">
        Imagica
      </Link>

      <div className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-orange-400">Home</Link>
        <Link to="/services" className="hover:text-orange-400">Services</Link>
      </div>
    </nav>
  );
}