import express from "express";
import {
  createProduct,
  listProduct,
  updateProduct,
  productByID,
  removeProduct,
  readProduct,
  listRelated,
  listSearch,
  filterCategory,
} from "../controllers/productController";
import { userID } from "../controllers/userControllers";
import { isAuth, isAdmin } from "../controllers/auth";
const router = express.Router();

router.get("/list-search", listSearch);
router.get("/filter-category", filterCategory);
router.get("/list-product", listProduct);
router.get("/list-related-product", listRelated);
router.get("/read-product/:id", readProduct);
router.post("/create-product/:userId", isAuth, isAdmin, createProduct);
router.put("/update-product/:id/:userId", isAuth, isAdmin, updateProduct);
router.delete("/remove-product/:id/:userId", isAuth, isAdmin, removeProduct);

router.param("id", productByID);
router.param("userId", userID);
module.exports = router;
