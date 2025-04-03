import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [], // Initial state
  setProducts: (products) => set({ products }), // Method to update products

  // Create a product asynchronously
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        return { success: false, message: "Failed to create product." };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));

      return { success: true, message: "Product created successfully!" };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while creating the product.",
      };
    }
  },
}));
