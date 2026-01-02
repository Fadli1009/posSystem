import Layout from "../components/Layout";
import Table from "../components/Table";
import ModalCreate from "../components/ModalForm";
import ModalAlert from "../components/ModalAlert";
import ModalForm from "../components/ModalForm";

import { Link } from "react-router";

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
} from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { use, useEffect, useRef, useState } from "react";
import api from "../utility/axios";

const KategoriBarang = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlertDel, setShowDelAlert] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [kategori, setKategori] = useState({
    id: null,
    nama_kategori: "",
  });
  // const [namaKategori, setNamaKategori] = useState(null);

  const refKategori = useRef(null);

  const columns = [
    {
      label: "No",
      key: "no",
      type: "text",
      render: (_, index) => index + 1,
      className: "font-medium text-gray-900",
    },
    {
      label: "Nama Kategori",
      key: "nama_kategori",
      type: "text",
    },
  ];

  const handleDelete = (item) => {
    setShowDelAlert(true);
    setKategori(item);
  };

  const handleEdit = (item) => {
    setShowEditModal(true);
    setKategori({
      id: item.id,
      nama_kategori: item.nama_kategori ?? "",
    });
  };

  const queryQlient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["kategori-barang"],
    queryFn: async () => {
      const res = await api.get("/kategori-barang");

      return res.data.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (dataKat) => {
      const res = await api.post("/kategori-barang", dataKat);

      return res.data.data;
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["kategori-barang"] });
      setShowAddModal(false);
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/kategori-barang/${id}`, payload);
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["kategori-barang"] });
      setShowEditModal(false);
    },
  });

  const mutationDel = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/kategori-barang/${id}`);
    },
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ["kategori-barang"] });
      setShowDelAlert(false);
    },
  });

  const submitAddData = (e) => {
    e.preventDefault();

    const formData = new FormData(refKategori.current);

    mutation.mutate(formData);
  };

  const submitEditKategori = (e) => {
    e.preventDefault();

    mutationEdit.mutate({
      id: kategori.id,
      payload: {
        nama_kategori: kategori.nama_kategori,
      },
    });
  };

  const actionDelete = () => {
    mutationDel.mutate(kategori.id);
  };

  return (
    <Layout className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Kelola Kategori Barang
        </h1>
        <p className="text-gray-600">Manajemen Kategori Barang</p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Barang</p>
              <h3 className="text-2xl font-bold text-gray-800">245</h3>
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
              <h3 className="text-2xl font-bold text-red-500">12</h3>
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
              <h3 className="text-2xl font-bold text-gray-800">18</h3>
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
              <h3 className="text-2xl font-bold text-gray-800">12.5M</h3>
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
                  placeholder="Cari barang..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {/* <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button> */}
              {/* <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button> */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kategori</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          //   currentPage={currentPage}
          //   totalPages={5}
          //   totalItems={245}
          //   itemsPerPage={10}
          //   onPageChange={handlePageChange}
          //   lowStockThreshold={100}
        />
      </div>

      {/* Modal Tambah Barang */}
      {showAddModal && (
        <ModalForm
          type={"add"}
          judul={"Tambah Kategori"}
          setShowAddModal={setShowAddModal}
          idForm={"submitAddData"}
        >
          <form
            onSubmit={submitAddData}
            ref={refKategori}
            id="submitAddData"
            className="p-8"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Kategori
            </label>
            <input
              type="text"
              placeholder="Nama kategori"
              name="nama_kategori"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </form>
        </ModalForm>
      )}

      {/* Modal Edit Barang */}
      {showEditModal && (
        <ModalForm
          type={"update"}
          judul={"Perbarui Kategori"}
          setShowAddModal={setShowEditModal}
          idForm={"submitEditKategori"}
        >
          <form
            className="p-8"
            onSubmit={submitEditKategori}
            id="submitEditKategori"
            ref={refKategori}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Kategori
            </label>
            <input
              type="text"
              placeholder="Nama kategori"
              name="nama_kategori"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              value={kategori.nama_kategori}
              onChange={(e) =>
                setKategori({ ...kategori, nama_kategori: e.target.value })
              }
            />
          </form>
        </ModalForm>
      )}

      {/* Modal Hapus */}
      {showAlertDel && (
        <ModalAlert
          tipe={"hapus"}
          confirm={"Yakin ingin menghapus kategiri ini?"}
          action={actionDelete}
          setShowDeleteModal={setShowDelAlert}
          selectedBarang={kategori}
          namaItem={kategori.nama_kategori}
        />
      )}
    </Layout>
  );
};

export default KategoriBarang;
