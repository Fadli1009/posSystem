import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPages from "./auth/Login.jsx";
import Registrasi from "./auth/Register.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPages />} />
      <Route path="/registrasi" element={<Registrasi />} />
    </Routes>
  </BrowserRouter>
);
