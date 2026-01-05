import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Package,
  Filter,
  Download,
  Upload,
  X,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import ModalForm from "../components/ModalForm";
import ModalAlert from "../components/ModalAlert";
import api from "../utility/axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Pengguna = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(false);

  const [pengguna, setPengguna] = useState({
    id: null,
    name: "",
    email: "",
    id_role: "",
  });

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const queryQlient = useQueryClient();
  const refPengguna = useRef(null);

  const userData = [
    {
      label: "No",
      key: "no",
      type: "numbering",
      render: (_, index) => index + 1,
      className: "font-medium text-gray-900",
    },
    {
      label: "Nama Pengguna",
      key: "name",
      type: "text",
      className: "font-medium text-gray-900",
    },
    {
      label: "Email",
      key: "email",
      type: "email",
      className: "font-medium text-gray-900",
    },
    {
      label: "Role",
      key: "role_name",
      type: "text",
      className:
        "font-bold text-gray-900 bg-blue-300 px-3 py-1 text-white m-auto rounded-[7px] uppercase ",
    },
  ];

  // Get data user
  const { data, isLoading } = useQuery({
    queryKey: ["pengguna"],
    queryFn: async () => {
      const res = await api.get("/pengguna");
      return res.data.data;
    },
  });

  // Get data role
  const { data: dataRole = [] } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await api.get("/role");
      return (res.data?.data ?? []).filter((role) => role.id !== 1);
    },
  });

  const mutationAddUser = useMutation({
    mutationFn: async (addDataUser) => {
      const res = await api.post("/pengguna", addDataUser);

      return res.data.data;
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["pengguna"] });
      setShowAddUser(false);
    },
  });

  const mutationEditUser = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/pengguna/${id}`, payload);
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["pengguna"] });
      setShowEditUser(false);
    },
  });

  const mutationDeleteUser = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/pengguna/${id}`);
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["pengguna"] });
      setShowDeleteUser(false);
    },
  });

  const actionDeletUser = () => {
    mutationDeleteUser.mutate(pengguna.id);
  };

  const actionEditUser = (e) => {
    e.preventDefault();

    const payload = {
      name: pengguna.name,
      email: pengguna.email,
      id_role: pengguna.id_role,
    };

    if (password) {
      payload.password = password;
      payload.password_confirmation = passwordConfirmation;
    }

    console.log(payload);

    mutationEditUser.mutate({ id: pengguna.id, payload });
  };

  // tambah data user
  const handleAddUser = (e) => {
    e.preventDefault();

    const formData = new FormData(refPengguna.current);
    mutationAddUser.mutate(formData);
  };

  // edit data user
  const handleEditUser = (item) => {
    setShowEditUser(true);

    setPengguna({
      id: item.id,
      name: item.name,
      password: item.password,
      email: item.email,
      id_role: item.id_role,
    });
  };

  // console.log(pengguna);

  // hapus data user
  const handleDeleteUser = (item) => {
    setShowDeleteUser(true);
    setPengguna(item);
  };

  return (
    <Layout className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Kelola Pengguna
        </h1>
        <p className="text-gray-600">Manajemen pengguna</p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Barang</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {data.length}
              </h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Stok Rendah</p>
              <h3 className="text-2xl font-bold text-red-500">
                {getMininmumStok}
              </h3>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Kategori</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {jumlahKategori || 0}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Filter className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Nilai</p>
              <h3 className="text-2xl font-bold text-gray-800">
                Rp {formatRupiahSingkat(totalHarga)}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              {/* <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button> */}
              <button
                onClick={() => setShowAddUser(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pengguna</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={userData}
          data={data || []}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          isLoading={isLoading}
          // lowStockThreshold={30}
        />
      </div>

      {/* Modal Tambah Barang */}
      {showAddUser && (
        <ModalForm
          // isLoading={mutation.isLoading}
          type={"add"}
          judul={"Tambah Data Pengguna"}
          setShowAddModal={setShowAddUser}
          idForm={"handleAddUser"}
        >
          <form
            onSubmit={handleAddUser}
            ref={refPengguna}
            id="handleAddUser"
            className="p-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pengguna
                </label>
                <input
                  type="text"
                  placeholder="Masukan nama pengguna"
                  name="name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Aktif
                </label>
                <input
                  type="email"
                  placeholder="Masukan email aktif pengguna"
                  name="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      showPassword ? "Masukan password pengguna" : "**********"
                    }
                    name="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <button
                    type="button"
                    onClick={(e) => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <small className="text-sm text-red-600">
                  Minimal jumlah password 8 karakter !
                </small>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={
                      showConfirmPassword
                        ? "Konfirmasi password pengguna"
                        : "**********"
                    }
                    name="password_confirmation"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <small className="text-sm text-red-600">
                  Pastikan konfirmasi password sesuai !
                </small>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>

                <select
                  name="id_role"
                  id=""
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-500"
                >
                  <option selected disabled>
                    Pilih Role
                  </option>

                  {dataRole.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.nama_role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </ModalForm>
      )}

      {showEditUser && (
        <ModalForm
          // isLoading={mutation.isLoading}
          type={"edit"}
          judul={"Edit Data Pengguna"}
          setShowAddModal={setShowEditUser}
          idForm={"actionEditUser"}
        >
          <form
            ref={refPengguna}
            onSubmit={actionEditUser}
            id="actionEditUser"
            className="p-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pengguna
                </label>
                <input
                  type="text"
                  placeholder="Masukan nama pengguna"
                  name="name"
                  value={pengguna.name}
                  onChange={(e) =>
                    setPengguna({ ...pengguna, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Aktif
                </label>
                <input
                  type="email"
                  placeholder="Masukan email aktif pengguna"
                  name="email"
                  value={pengguna.email}
                  onChange={(e) =>
                    setPengguna({ ...pengguna, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={
                      showPassword ? "Masukan password pengguna" : "**********"
                    }
                    // value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <button
                    type="button"
                    onClick={(e) => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <small className="text-sm text-red-600">
                  Minimal jumlah password 8 karakter !
                </small>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={
                      showConfirmPassword
                        ? "Konfirmasi password pengguna"
                        : "**********"
                    }
                    name="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <small className="text-sm text-red-600">
                  Pastikan konfirmasi password sesuai !
                </small>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>

                <select
                  name="id_role"
                  id=""
                  value={pengguna.id_role}
                  onChange={(e) =>
                    setPengguna({ ...pengguna, id_role: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-500"
                >
                  <option selected disabled>
                    Pilih Role
                  </option>

                  {dataRole.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.nama_role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </ModalForm>
      )}

      {/* Modal Hapus */}
      {showDeleteUser && (
        <ModalAlert
          tipe={"hapus"}
          confirm={`apakah yakin ingin menghapus pengguna ? (${pengguna.name})`}
          action={actionDeletUser}
          setShowDeleteModal={setShowDeleteUser}
          // selectedBarang={selectedBarang}
        />
      )}
    </Layout>
  );
};

export default Pengguna;
