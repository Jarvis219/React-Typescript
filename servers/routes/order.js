import express from "express";
import {
  addOrder,
  listOrder,
  orderByID,
  updateOrder,
  removeOrder,
} from "../controllers/order";
const router = express.Router();

router.get("/list-order", listOrder);
// router.get("/read-category/:id", readCategory);
router.post("/order", addOrder);
router.put("/update-order/:id", updateOrder);
router.delete("/remove-order/:id", removeOrder);

router.param("id", orderByID);
module.exports = router;
