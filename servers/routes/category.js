import express from "express";
import {
  createCategory,
  listCategory,
  updateCategory,
  categoryByID,
  removeCategory,
  readCategory,
} from "../controllers/categoryController";
import { userID } from "../controllers/userControllers";
import { isAuth, isAdmin } from "../controllers/auth";
import { authToken } from "../middleware/authToken";
const router = express.Router();

router.get("/list-category", listCategory);
router.get("/read-category/:id", readCategory);
router.post(
  "/create-category/:userId",
  authToken,
  isAuth,
  isAdmin,
  createCategory
);
router.put("/update-category/:id/:userId", isAuth, isAdmin, updateCategory);
router.delete("/remove-category/:id/:userId", isAuth, isAdmin, removeCategory);
router.param("id", categoryByID);
router.param("userId", userID);
module.exports = router;
