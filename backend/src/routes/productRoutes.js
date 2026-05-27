import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protectRoute, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protectRoute, authorizeRoles("admin"), createProduct);
router.put("/:id", protectRoute, authorizeRoles("admin"), updateProduct);
router.delete("/:id", protectRoute, authorizeRoles("admin"), deleteProduct);

export default router;
