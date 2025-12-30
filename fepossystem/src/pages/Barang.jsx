import { useState } from "react";
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

const Barang = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
    {
      id: 1,
      code: "BRG001",
      name: "Indomie Goreng",
      category: "Makanan",
      stock: 150,
      price: 3500,
      supplier: "PT. Indofood",
    },
    {
      id: 2,
      code: "BRG002",
      name: "Aqua 600ml",
      category: "Minuman",
      stock: 200,
      price: 4000,
      supplier: "PT. Aqua",
    },
    {
      id: 3,
      code: "BRG003",
      name: "Sabun Lifebuoy",
      category: "Kebersihan",
      stock: 75,
      price: 5500,
      supplier: "PT. Unilever",
    },
    {
      id: 4,
      code: "BRG004",
      name: "Beras Premium 5kg",
      category: "Sembako",
      stock: 50,
      price: 65000,
      supplier: "CV. Pangan Jaya",
    },
    {
      id: 5,
      code: "BRG005",
      name: "Minyak Goreng 1L",
      category: "Sembako",
      stock: 120,
      price: 18000,
      supplier: "PT. Minyak Kita",
    },
  ];
  const columns = [
    {
      label: "Kode",
      key: "code",
      type: "text",
      className: "font-medium text-gray-900",
    },
    {
      label: "Nama Barang",
      key: "name",
      type: "text",
    },
    {
      label: "Kategori",
      key: "category",
      type: "badge",
      badgeClass: "bg-blue-100 text-blue-700",
    },
    {
      label: "Stok",
      key: "stock",
      type: "stock",
    },
    {
      label: "Harga",
      key: "price",
      type: "currency",
    },
    {
      label: "Supplier",
      key: "supplier",
      type: "text",
      className: "text-gray-600",
    },
  ];
  const handleEdit = (item) => {
    console.log("Edit item:", item);
    alert(`Edit: ${item.name}`);
  };

  const handleDelete = (item) => {
    console.log("Delete item:", item);
    alert(`Hapus: ${item.name}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

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
          data={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={5}
          totalItems={245}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          lowStockThreshold={100}
        />
      </div>

      {/* Modal Tambah Barang */}
      {showAddModal && (
        <ModalForm
          type={"add"}
          judul={"Tambah Barang"}
          setShowAddModal={setShowAddModal}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kode Barang
              </label>
              <input
                type="text"
                placeholder="BRG001"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

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
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none">
                <option>Pilih Kategori</option>
                <option>Makanan</option>
                <option>Minuman</option>
                <option>Kebersihan</option>
                <option>Sembako</option>
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
        </ModalForm>
      )}

      {/* Modal Edit Barang */}
      {showEditModal && <ModalForm setShowAddModal={setShowAddModal} />}

      {/* Modal Hapus */}
      {showDeleteModal && <ModalAlert />}
    </Layout>
  );
};

export default Barang;
