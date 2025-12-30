import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPages from "./auth/Login.jsx";
import Registrasi from "./auth/Register.jsx";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPages />} />
      <Route path="/registrasi" element={<Registrasi />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
);import { Form } from "lucide-react";

