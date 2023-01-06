import Router from "express";
import { protect } from "../middlewares/auth";

import {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
  login,
  getMe,
} from "../controllers/userController";

const router = Router();

router.route("/").post(createUser);
router.route("/").get(getAllUsers);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);
router.route("/login").post(login);

router.get("/me", protect, getMe);

export default router;
