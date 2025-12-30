import { Edit2, Trash2 } from "lucide-react";

const Table = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  lowStockThreshold = 100,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate array untuk pagination buttons
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  // Render cell value berdasarkan tipe kolom
  const renderCellValue = (item, column) => {
    const value = item[column.key];

    switch (column.type) {
      case "badge":
        return (
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full ${
              column.badgeClass || "bg-blue-100 text-blue-700"
            }`}
          >
            {value}
          </span>
        );

      case "stock":
        return (
          <span
            className={`text-sm font-medium ${
              value < lowStockThreshold ? "text-red-600" : "text-gray-900"
            }`}
          >
            {value}
          </span>
        );

      case "currency":
        return (
          <span className="text-sm text-gray-900">
            Rp {Number(value).toLocaleString("id-ID")}
          </span>
        );

      case "text":
      default:
        return (
          <span className={`text-sm ${column.className || "text-gray-900"}`}>
            {value}
          </span>
        );
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-sm font-medium">Tidak ada data</p>
                    <p className="text-xs">Data akan muncul di sini</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={item.id || rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render
                        ? column.render(item, rowIndex)
                        : renderCellValue(item, column)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > 0 && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Menampilkan {startItem}-{endItem} dari {totalItems} data
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${
                currentPage === 1
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Sebelumnya
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-1.5 text-sm text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 border rounded-lg text-sm transition-colors ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-400 cursor-not-allowed"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
