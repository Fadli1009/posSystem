import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPages from "./auth/Login.jsx";
import Registrasi from "./auth/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import KategoriBarang from "./pages/KategoriBarang.jsx";
import Barang from "./pages/Barang.jsx";
import LaporanTransaksi  from "./pages/LaporanTransaksi.jsx";
import Pengguna  from "./pages/Pengguna.jsx";

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPages />} />
      <Route path="/registrasi" element={<Registrasi />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/kategori-barang" element={<KategoriBarang />} />
      <Route path="/barang" element={<Barang />} />
      <Route path="/laporan-transaksi" element={<LaporanTransaksi />} />
      <Route path="/pengguna" element={<Pengguna />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
);import { Form } from "lucide-react";

