import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import { User, Mail, Lock, Shield, CheckCircle, Sparkles } from "lucide-react";
import api from "../utility/axios";

const ProfilPengguna = () => {
  const profile = {
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    password: "••••••••",
    role: "Administrator",
  };

  const [dataProfile, setDataProfile] = useState(null);
  const [roleName, setRoleName] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/me");
        setDataProfile(res.data);
        setRoleName(res.data.role.nama_role.toUpperCase() || "Belum ada");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen  flex  p-2">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            {/* HEADER */}
            {/* HEADER */}
            <div className="flex items-center justify-between gap-6 p-8 border-b border-gray-100">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {dataProfile ? dataProfile.name : ""}
                  </h1>
                  <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-semibold">
                    <Shield className="w-4 h-4" />
                    {roleName}
                  </div>
                </div>
              </div>

              {/* BUTTON EDIT */}
              <button
                type="button"
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Edit Profil
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EMAIL */}
              <div className="border rounded-xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Email
                  </p>
                  <p className="text-gray-800 font-semibold mt-1">
                    {dataProfile ? dataProfile.email : ""}
                  </p>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="border rounded-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Password
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Password disembunyikan demi keamanan akun
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-8 py-5 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
              <span>Akun aktif</span>
              <span>Bergabung sejak {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilPengguna;
