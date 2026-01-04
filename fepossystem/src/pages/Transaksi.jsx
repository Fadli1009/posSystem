import { useState } from "react";
import Filter from "../components/Filter";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { Grid3x3, LayoutGrid, Search } from "lucide-react";
import api from "../utility/axios";
import { useQuery } from "@tanstack/react-query";

const getBarang = async () => {
  const res = await api.get("/barang");
  return res.data.data;
};
const Transaksi = () => {
  const [gridSize, setGridSize] = useState(4); // 4 columns default
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["barang"],
    queryFn: getBarang,
    onSuccess: (data) => {
      console.log("Data fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });
  if (isLoading) return <div>Loading...</div>;
  // console.log(data);

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
  return (
    <Layout>
      {/* <Filter /> */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Katalog Produk
            </h1>
            <p className="text-gray-600">Pilih produk yang ingin Anda beli</p>
          </div>

          {/* Grid Size Controls */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-orange-100 shadow-sm">
            {[2, 3, 4, 5].map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={`p-2 rounded-md transition-all ${
                  gridSize === size
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-orange-50"
                }`}
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

        {/* Search and Filter */}
      </div>

      {/* Product Grid */}
      <div className={`grid ${gridClasses[gridSize]} gap-6`}>
        {data.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {/* Empty State (if no products) */}
      {data.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-orange-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Produk tidak ditemukan
          </h3>
          <p className="text-gray-600">
            Coba kata kunci pencarian yang berbeda
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Transaksi;
