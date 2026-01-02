import { ShoppingCart, Package } from 'lucide-react';

const ProductCard = ({ 
  nama_barang = "Nama Produk", 
  gambar = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop", 
  jumlah = 0, 
  harga = 0, 
  kategori = "Kategori",
}) => {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="w-[160px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-orange-100">
  {/* Image */}
  <div className="relative w-full h-28 bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
    <img 
      src={gambar}
      alt={nama_barang}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      onError={(e) => {
        e.target.src =
          "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop";
      }}
    />

    {/* Category */}
    <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
      {kategori}
    </span>

    {/* Stock */}
    <span className="absolute top-2 left-2 bg-white text-orange-600 px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
      <Package size={12} />
      <span>{jumlah}</span>
    </span>
  </div>

  {/* Content */}
  <div className="p-3">
    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
      {nama_barang}
    </h3>

    <p className="text-lg font-bold text-orange-600 mt-1 mb-2">
      {formatRupiah(harga)}
    </p>

    <button className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition">
      <ShoppingCart size={14} />
      <span>Tambah</span>
    </button>
  </div>
</div>

  );
};

export default ProductCard;