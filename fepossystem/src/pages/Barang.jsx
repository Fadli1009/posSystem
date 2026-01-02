import { useRef, useState } from "react";
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
import Layout from "../components/Layout";
import Table from "../components/Table";
import ModalCreate from "../components/ModalForm";
import ModalAlert from "../components/ModalAlert";
import ModalForm from "../components/ModalForm";
import api from "../utility/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// consume API

// consume barang
const getBarang = async () => {
  const res = await api.get("/barang");
  return res.data.data;
};

// consume post barang
const postBarang = async (barangData) => {
  const res = await api.post("/barang", barangData);
  return res.data;
};

// consume delete barang
const deleteBarang = async (id) => {
  const res = await api.delete(`/barang/${id}`);
  return res.data;
};

// consume edit barang
const editBarang = async ({ id, payload }) => {
  const res = await api.put(`/barang/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const getkategori = async () => {
  const res = await api.get("/kategori-barang");
  return res.data.data;
};

const Barang = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const formRef = useRef(null);
  const queryClient = useQueryClient();
  const [selectedBarang, setSelectedBarang] = useState(null);
  const refEdit = useRef(null);
  const [itemEdit, setItemEdit] = useState({
    id: null,
    nama_barang: "",
    id_kategori: "",
    harga: "",
    jumlah: "",
    tanggal: "",
    gambar: null,
  });

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
    onError: (error) => {
      console.error("Error fetching barang data:", error);
    },
    // refetchInterval: 5000,
    // refetchIntervalInBackground: false,
    // staleTime: 8000,
  });

  const mutation = useMutation({
    mutationFn: postBarang,
    onSuccess: (data) => {
      console.log("Barang berhasil ditambahkan:", data);
      queryClient.invalidateQueries({ queryKey: ["barang"] });
      setShowAddModal(false);
    },
    onError: (error) => {
      console.error("Error menambahkan barang:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBarang,
    onSuccess: (data) => {
      console.log("Barang berhasil dihapus:", data);
      queryClient.invalidateQueries({ queryKey: ["barang"] });
      setShowDeleteModal(false);
    },
    onError: (error) => {
      console.error("Error menghapus barang:", error);
    },
  });

  const editMutation = useMutation({
    mutationFn: editBarang,
    onSuccess: (data) => {
      setShowEditModal(false);
    },
  });

  const dataKategori = useQuery({
    queryKey: ["kategori"],
    queryFn: getkategori,
  });

  const totalHarga = data.reduce((total, item) => {
    return total + item.harga * item.jumlah;
  }, 0);

  const formatRupiahSingkat = (angka) => {
    if (angka >= 1_000_000_000) {
      return (angka / 1_000_000_000).toFixed(1).replace(".0", "") + " M";
    }
    if (angka >= 1_000_000) {
      return (angka / 1_000_000).toFixed(1).replace(".0", "") + " JT";
    }
    if (angka >= 1_000) {
      return (angka / 1_000).toFixed(1).replace(".0", "") + " rb";
    }
    return angka.toString();
  };

  const columns = [
    {
      label: "No",
      key: "no",
      type: "numbering",
      render: (_, index) => index + 1,
      className: "font-medium text-gray-900",
    },
    {
      label: "Kode",
      key: "barcode",
      type: "text",
      className: "font-medium text-gray-900",
    },
    {
      label: "Nama Barang",
      key: "nama_barang",
      type: "text",
    },
    {
      label: "Kategori",
      render: (item) => (
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {item.kategori?.nama_kategori ?? "Tidak ada kategori"}
        </span>
      ),
      type: "badge",
      badgeClass: "bg-blue-100 text-blue-700",
    },
    {
      label: "Stok",
      key: "jumlah",
      type: "stock",
    },
    {
      label: "Harga",
      key: "harga",
      type: "currency",
    },
    {
      label: "Tanggal",
      key: "tanggal",
      type: "text",
      className: "text-gray-600",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    mutation.mutate(formData);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(itemEdit).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    editMutation.mutate({
      id: itemEdit.id,
      payload: formData,
    });
  };

  const handleEdit = (item) => {
    setShowEditModal(true);
    console.log(item);

    setItemEdit({
      id: item.id,
      nama_barang: item.nama_barang,
      id_kategori: item.id_kategori,
      harga: item.harga,
      jumlah: item.jumlah,
      tanggal: item.tanggal,
      gambar: null,
    });
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setSelectedBarang(id);
  };

  const handleDeleteBarang = () => {
    deleteMutation.mutate(selectedBarang.id);
  };

  const getMininmumStok = data.reduce((min, item) => {
    return item.jumlah < min ? item.jumlah : min;
  }, 0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading data</div>;
  console.log(showEditModal);

  return (
    <Layout className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kelola Barang</h1>
        <p className="text-gray-600">Manajemen inventori dan stok barang</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                {dataKategori.length || 0}
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
      </div>

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
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Barang</span>
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
          lowStockThreshold={30}
        />
      </div>

      {/* Modal Tambah Barang */}
      {showAddModal && (
        <ModalForm
          isLoading={mutation.isLoading}
          type={"add"}
          judul={"Tambah Barang"}
          setShowAddModal={setShowAddModal}
          idForm={"formAdd"}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            id="formAdd"
            className="p-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Barang
                </label>
                <input
                  type="text"
                  placeholder="Nama barang"
                  name="nama_barang"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  name="id_kategori"
                >
                  <optio>Pilih Kategori</optio>
                  {dataKategori.data &&
                    dataKategori.data.map((kategori) => (
                      <option key={kategori.id} value={kategori.id}>
                        {kategori.nama_kategori}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Barang
                </label>
                <input
                  type="number"
                  placeholder="0"
                  name="harga"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar
                </label>
                <input
                  type="file"
                  placeholder="0"
                  name="gambar"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok Awal
                </label>
                <input
                  type="number"
                  placeholder="0"
                  name="jumlah"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="tanggal"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </form>
        </ModalForm>
      )}
      {showEditModal && (
        <ModalForm
          isLoading={mutation.isLoading}
          type={"edit"}
          judul={"Edit Barang"}
          setShowAddModal={setShowEditModal}
          idForm={"editForm"}
        >
          <form
            ref={refEdit}
            onSubmit={handleSubmitEdit}
            id="editForm"
            className="p-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Barang
                </label>
                <input
                  type="text"
                  placeholder="Nama barang"
                  name="nama_barang"
                  value={itemEdit.nama_barang}
                  onChange={(e) => {
                    setItemEdit({ ...itemEdit, nama_barang: e.target.value });
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  name="id_kategori"
                  value={itemEdit.id_kategori}
                  onChange={(e) => {
                    setItemEdit({ ...itemEdit, id_kategori: e.target.value });
                  }}
                >
                  <option selected>Pilih Kategori</option>
                  <option value="1">Makanan</option>
                  <option value="2">Minuman</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga Barang
                </label>
                <input
                  type="text"
                  placeholder="0"
                  name="harga"
                  onChange={(e) => {
                    setItemEdit({ ...itemEdit, harga: e.target.value });
                  }}
                  value={itemEdit.harga}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar
                </label>
                <input
                  type="file"
                  placeholder="0"
                  name="gambar"
                  onChange={(e) =>
                    setItemEdit({ ...itemEdit, gambar: e.target.files[0] })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok Awal
                </label>
                <input
                  type="text"
                  placeholder="0"
                  name="jumlah"
                  value={itemEdit.jumlah}
                  onChange={(e) => {
                    setItemEdit({ ...itemEdit, jumlah: e.target.value });
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="tanggal"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  onChange={(e) => {
                    setItemEdit({ ...itemEdit, tanggal: e.target.value });
                  }}
                  value={itemEdit.tanggal}
                />
              </div>
            </div>
          </form>
        </ModalForm>
      )}

      {/* Modal Hapus */}
      {showDeleteModal && (
        <ModalAlert
          tipe={"hapus"}
          confirm={"apakah yakin ingin menghapus barang?"}
          action={handleDeleteBarang}
          setShowDeleteModal={setShowDeleteModal}
          selectedBarang={selectedBarang}
          namaItem={selectedBarang.nama_barang}
        />
      )}
    </Layout>
  );
};

export default Barang;
