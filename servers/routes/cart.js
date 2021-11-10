import express from "express";
import {
  addCart,
  listCart,
  listCartUser,
  cartByID,
  removeCart,
  readCart,
  updateCart,
} from "../controllers/cartControllers";
import { userID } from "../controllers/userControllers";
import { isAuth } from "../controllers/auth";
const router = express.Router();

router.get("/list-cart/:userId", isAuth, listCart);
router.get("/list-cart/user/:userId", isAuth, listCartUser);
router.get("/read-cart/:id/:userId", isAuth, readCart);
router.post("/create-cart/:userId", isAuth, addCart);
router.put("/update-cart/:id/:userId", isAuth, updateCart);
router.delete("/remove-cart/:id/:userId", isAuth, removeCart);

router.param("id", cartByID);
router.param("userId", userID);
module.exports = router;
