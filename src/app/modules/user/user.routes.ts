import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middlewares/auth";
import { uploadProfileImage } from "../../middlewares/multer";

const router = Router();

// Routes for user management
router.get("/", auth, userControllers.getAllUsers);
router.get("/:id", auth, userControllers.getSingleUser);
router.patch("/:id", auth, uploadProfileImage, userControllers.updateProfile);
router.delete("/:id", auth, userControllers.deleteUser);

export const userRoutes = router;
