import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protectRoute, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCategories);

router.post("/", protectRoute, authorizeRoles("admin"), createCategory);
router.put("/:id", protectRoute, authorizeRoles("admin"), updateCategory);
router.delete("/:id", protectRoute, authorizeRoles("admin"), deleteCategory);

export default router;
