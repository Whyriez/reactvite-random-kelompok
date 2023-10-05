import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayouts from "./pages/HomeLayouts.jsx";
import AdminLayouts from "./pages/AdminLayouts.jsx";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayouts />} />
          <Route path="/admin" element={<AdminLayouts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
