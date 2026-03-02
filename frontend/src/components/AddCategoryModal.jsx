import React, { useState } from "react";

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      setError("Category name cannot be empty");
      return;
    }

    if (newCategory.length > 50) {
      setError("Category name cannot exceed 50 characters");
      return;
    }

    // Capitalize first letter of each word
    const formattedCategory = newCategory
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Send as object with name property
    onAddCategory({ name: formattedCategory });
    setNewCategory("");
    setError("");
    onClose();
  };

  const handleCancel = () => {
    setNewCategory("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-sky-blue/20">
          <h3 className="text-lg font-bold font-display text-primary uppercase tracking-wider">
            Add New Category
          </h3>
          <button
            onClick={handleCancel}
            className="text-charcoal/60 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wide">
                Category Name
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name..."
                className="w-full px-4 py-3 border border-sky-blue/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    error
                  </span>
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-3 border border-sky-blue/20 text-charcoal font-bold rounded-lg hover:bg-sky-blue/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
