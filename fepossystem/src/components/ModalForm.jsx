import { X, Save } from "lucide-react";

const ModalForm = ({
  setShowAddModal,
  children,
  judul,
  type,
  isLoading,
  idForm,  
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">{judul}</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {children}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Batal
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors"
            type="submit"
            form={idForm}
            disabled={isLoading}
          >
            <Save className="w-4 h-4" />
            {type === "add" ? "Simpan" : "Perbarui"}
            {isLoading ? "..." : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
