import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Analyse from "./pages/Analyse";
import Compare from "./pages/Compare";
import Write from "./pages/Write";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/analyse" replace />} />
            <Route path="/analyse" element={<Analyse />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/write" element={<Write />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;