import { useState } from "react";
import Filter from "../components/Filter";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { Grid3x3, LayoutGrid, Search, Loader2 } from "lucide-react";
import api from "../utility/axios";
import { useQuery } from "@tanstack/react-query";

const getBarang = async () => {
  const res = await api.get("/barang");
  return res.data.data;
};

// Product Card Skeleton Component
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="absolute top-3 right-3">
          <div className="bg-gray-300 w-20 h-6 rounded-full"></div>
        </div>
        <div className="absolute top-3 left-3">
          <div className="bg-gray-300 w-12 h-6 rounded-full"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

const Transaksi = () => {
  const [gridSize, setGridSize] = useState(4); // 4 columns default
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
  });

  console.log(data);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`${product.nama_barang} ditambahkan ke keranjang!`);
  };

  // Grid column classes
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  // Show error state
  if (error) {
    return (
      <Layout>
        <Filter />
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Gagal Memuat Data
          </h3>
          <p className="text-gray-600 mb-4">
            Terjadi kesalahan saat mengambil data produk
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Muat Ulang
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Filter />
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Katalog Produk
            </h1>
            <p className="text-gray-600">
              {isLoading
                ? "Memuat produk..."
                : "Pilih produk yang ingin Anda beli"}
            </p>
          </div>

          {/* Grid Size Controls */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-orange-100 shadow-sm">
            {[2, 3, 4, 5].map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                disabled={isLoading}
                className={`p-2 rounded-md transition-all ${
                  gridSize === size
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-50"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                title={`${size} kolom`}
              >
                {size === 2 && <Grid3x3 size={18} />}
                {size === 3 && <LayoutGrid size={18} />}
                {size === 4 && <LayoutGrid size={18} />}
                {size === 5 && <LayoutGrid size={18} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State with Skeleton */}
      {isLoading && (
        <>
          {/* Loading Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8 py-4 bg-orange-50 rounded-lg border border-orange-100">
            <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
            <span className="text-orange-600 font-medium">
              Memuat produk...
            </span>
          </div>

          {/* Skeleton Grid */}
          <div className={`grid ${gridClasses[gridSize]} gap-6`}>
            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </>
      )}

      {/* Product Grid - Only show when data is loaded */}
      {!isLoading && data && data.length > 0 && (
        <div className={`grid ${gridClasses[gridSize]} gap-6`}>
          {data.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data && data.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-orange-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Produk tidak ditemukan
          </h3>
          <p className="text-gray-600">
            Tidak ada produk yang tersedia saat ini
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Transaksi;
