const ModalAlert = (setShowDeleteModal) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            Hapus Barang?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Apakah Anda yakin ingin menghapus barang ini? Tindakan ini tidak
            dapat dibatalkan.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Batal
            </button>
            <button className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
