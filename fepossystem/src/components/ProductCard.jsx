import { Package, ShoppingCart } from "lucide-react";

const ProductCard = ({
  gambar,
  nama_barang,
  kategori,
  jumlah,
  harga,
  onAddToCart,
}) => {
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
        <img
          src={gambar}
          alt={nama_barang}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop";
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {kategori.nama_kategori}
          </span>
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`${
              jumlah < 10 ? "bg-red-500 text-white" : "bg-white text-orange-600"
            } px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg`}
          >
            <Package size={12} strokeWidth={2.5} />
            <span>{jumlah}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name - Fixed Height */}
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 h-10 mb-3 leading-tight">
          {nama_barang}
        </h3>

        {/* Price */}
        <div className="mb-4 mt-auto">
          <p className="text-lg font-bold text-orange-600">
            {formatRupiah(harga)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          disabled={jumlah === 0}
          className={`w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
            jumlah === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 active:scale-95 shadow-md hover:shadow-lg"
          }`}
        >
          <ShoppingCart size={16} strokeWidth={2.5} />
          <span>{jumlah === 0 ? "Habis" : "Tambah"}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
