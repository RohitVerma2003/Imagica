import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import ToolPage from "./pages/ToolPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-950 text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tool/:type" element={<ToolPage />} />
          <Route path="/result/:jobId" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;