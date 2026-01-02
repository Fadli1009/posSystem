import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const FilterBar = ({ 
  searchQuery = '', 
  setSearchQuery, 
  selectedCategory = 'Semua', 
  setSelectedCategory, 
  priceRange = 'Semua', 
  setPriceRange, 
  categories = ['Semua', 'Minuman', 'Makanan', 'Snack'],
  resetFilters,
  hasActiveFilters = false 
}) => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  return (
  <div className="w-full bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden mb-6">
  {/* Search & Filter */}
  <div className="p-3 flex gap-2">
    {/* Search */}
    <div className="relative flex-1">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={16}
      />
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchQuery}
        className="w-full pl-9 pr-3 py-2 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
      />
    </div>

    {/* Filter */}
    <button
      onClick={() => setShowFilterPanel(!showFilterPanel)}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition
        ${
          showFilterPanel || hasActiveFilters
            ? "bg-orange-500 text-white"
            : "bg-orange-100 text-orange-700 hover:bg-orange-200"
        }
      `}
    >
      <Filter size={16} />
      <span className="hidden sm:inline">Filter</span>
      {hasActiveFilters && (
        <span className="ml-1 text-xs font-bold">•</span>
      )}
    </button>
  </div>

  {/* Filter Panel */}
  {showFilterPanel && (
    <div className="border-t border-orange-100 p-3 bg-orange-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Harga
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:outline-none focus:border-orange-500"
          >
            <option value="Semua">Semua</option>
            <option value="< 10rb">{"< Rp 10.000"}</option>
            <option value="10rb - 50rb">Rp 10.000 - Rp 50.000</option>
            <option value="> 50rb">{"> Rp 50.000"}</option>
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              resetFilters();
              setShowFilterPanel(false);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 rounded-lg"
          >
            <X size={14} />
            Reset
          </button>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default FilterBar;