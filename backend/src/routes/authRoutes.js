import express from "express";
import { login, me, register } from "../controllers/authController.js";
import { authorizeRoles, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protectRoute, authorizeRoles("customer", "admin", "sales", "warehouse", "accounting"), me);

export default router;
