import express from "express";
import {
  addOrder,
  listOrder,
  orderByID,
  updateOrder,
  removeOrder,
  updateDeleteProduct,
  readOrder
} from "../controllers/order";
import {
  userID
} from "../controllers/userControllers";
import {
  isAuth,
  isAdmin
} from "../controllers/auth";
const router = express.Router();

router.get("/list-order/:userId", isAuth, listOrder);
router.get("/read-order/:id/:userId", isAuth, readOrder);
router.post("/order/:userId", isAuth, addOrder);
router.put("/update-order/:id/:userId", isAuth, isAdmin, updateOrder);
router.put("/update-order-remove/:id/:userId", isAuth, isAdmin, updateDeleteProduct)
router.delete("/remove-order/:id/:userId", isAuth, isAdmin, removeOrder);

router.param("id", orderByID);
router.param("userId", userID);
module.exports = router;