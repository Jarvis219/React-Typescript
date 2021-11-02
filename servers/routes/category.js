import express from "express";
import {
  createCategory,
  listCategory,
  updateCategory,
  categoryByID,
} from "../controllers/categoryController";
const router = express.Router();

router.get("/list-category", listCategory);
router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);

router.param("id", categoryByID);
module.exports = router;
