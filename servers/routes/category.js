import express from "express";
import {
  createCategory,
  listCategory,
  updateCategory,
  categoryByID,
  removeCategory,
  readCategory
} from "../controllers/categoryController";
const router = express.Router();

router.get("/list-category", listCategory);
router.get("/read-category/:id", readCategory);
router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/remove-category/:id", removeCategory);

router.param("id", categoryByID);
module.exports = router;