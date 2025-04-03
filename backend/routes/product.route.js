import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// creating an api to get all the products in database
router.get("/", getProducts);

// creating an api to create new products in database
router.post("/", createProduct);

// creating an api to delte the product
router.delete("/:id", deleteProduct);

// creating an api to update the product
router.put("/:id", updateProduct);

export default router;
