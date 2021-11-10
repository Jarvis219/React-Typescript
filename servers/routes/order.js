import express from "express";
import {
  addOrder,
  listOrder,
  orderByID,
  updateOrder,
  removeOrder,
} from "../controllers/order";
import { userID } from "../controllers/userControllers";
import { isAuth, isAdmin } from "../controllers/auth";
const router = express.Router();

router.get("/list-order/:userId", isAuth, listOrder);
// router.get("/read-category/:id", readCategory);
router.post("/order/:userId", isAuth, addOrder);
router.put("/update-order/:id/:userId", isAuth, isAdmin, updateOrder);
router.delete("/remove-order/:id/:userId", isAuth, isAdmin, removeOrder);

router.param("id", orderByID);
router.param("userId", userID);
module.exports = router;
