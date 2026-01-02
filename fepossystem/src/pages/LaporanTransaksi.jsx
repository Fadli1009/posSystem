import { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  Search,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import Layout from "../components/Layout";

const LaporanTransaksi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data - ganti dengan data real dari API
  const transactions = [
    {
      id: "TRX001",
      tanggal: "2025-01-02",
      kasir: "Ahmad Rifai",
      total: 250000,
      items: 5,
      metode: "Tunai",
    },
    {
      id: "TRX002",
      tanggal: "2025-01-02",
      kasir: "Siti Nurhaliza",
      total: 450000,
      items: 8,
      metode: "Transfer",
    },
    {
      id: "TRX003",
      tanggal: "2025-01-02",
      kasir: "Ahmad Rifai",
      total: 180000,
      items: 3,
      metode: "QRIS",
    },
    {
      id: "TRX004",
      tanggal: "2025-01-01",
      kasir: "Budi Santoso",
      total: 320000,
      items: 6,
      metode: "Tunai",
    },
    {
      id: "TRX005",
      tanggal: "2025-01-01",
      kasir: "Siti Nurhaliza",
      total: 550000,
      items: 12,
      metode: "Transfer",
    },
    {
      id: "TRX006",
      tanggal: "2025-01-01",
      kasir: "Ahmad Rifai",
      total: 125000,
      items: 2,
      metode: "Tunai",
    },
    {
      id: "TRX007",
      tanggal: "2024-12-31",
      kasir: "Budi Santoso",
      total: 680000,
      items: 15,
      metode: "QRIS",
    },
    {
      id: "TRX008",
      tanggal: "2024-12-31",
      kasir: "Siti Nurhaliza",
      total: 290000,
      items: 7,
      metode: "Tunai",
    },
    {
      id: "TRX009",
      tanggal: "2024-12-30",
      kasir: "Ahmad Rifai",
      total: 410000,
      items: 9,
      metode: "Transfer",
    },
    {
      id: "TRX010",
      tanggal: "2024-12-30",
      kasir: "Budi Santoso",
      total: 195000,
      items: 4,
      metode: "Tunai",
    },
  ];

  // Calculate statistics
  const totalTransaksi = transactions.length;
  const totalPendapatan = transactions.reduce((sum, trx) => sum + trx.total, 0);
  const rataRataTransaksi = totalPendapatan / totalTransaksi;

  // Format currency
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="text-orange-600" size={24} />
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">
            Total Transaksi
          </p>
          <p className="text-3xl font-bold text-gray-900">{totalTransaksi}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl font-bold">Rp</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">
            Total Pendapatan
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {formatRupiah(totalPendapatan)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl font-bold">Avg</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm font-medium mb-1">
            Rata-rata Transaksi
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {formatRupiah(rataRataTransaksi)}
          </p>
        </div>
      </div>

      {/* Filter and Actions */}
      <div className="bg-white rounded-xl border border-orange-100 shadow-sm mb-6">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari ID transaksi atau nama kasir..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Date Filter */}
            <div className="flex gap-3">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="semua">Semua Waktu</option>
                <option value="hari-ini">Hari Ini</option>
                <option value="minggu-ini">Minggu Ini</option>
                <option value="bulan-ini">Bulan Ini</option>
              </select>

              {/* Action Buttons */}
              <button className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 font-medium shadow-sm hover:shadow-md">
                <Printer size={18} />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID Transaksi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Kasir
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Metode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentTransactions.map((trx, index) => (
                <tr
                  key={trx.id}
                  className="hover:bg-orange-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-orange-600">
                      {trx.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">{trx.tanggal}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700 font-medium">
                      {trx.kasir}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {trx.items} item
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${
                          trx.metode === "Tunai"
                            ? "bg-green-100 text-green-700"
                            : ""
                        }
                        ${
                          trx.metode === "Transfer"
                            ? "bg-blue-100 text-blue-700"
                            : ""
                        }
                        ${
                          trx.metode === "QRIS"
                            ? "bg-purple-100 text-purple-700"
                            : ""
                        }
                      `}
                    >
                      {trx.metode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-900">
                      {formatRupiah(trx.total)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Menampilkan {startIndex + 1} -{" "}
            {Math.min(endIndex, transactions.length)} dari {transactions.length}{" "}
            transaksi
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LaporanTransaksi;
