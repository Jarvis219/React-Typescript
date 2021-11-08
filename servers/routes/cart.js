import express from "express";
import {
    addCart,
    listCart,
    listCartUser,
    cartByID,
    removeCart,
    readCart,
    updateCart
} from "../controllers/cartControllers";
const router = express.Router();

router.get("/list-cart", listCart);
router.get('/list-cart/user', listCartUser)
router.get("/read-cart/:id", readCart);
router.post("/create-cart", addCart);
router.put("/update-cart/:id", updateCart);
router.delete("/remove-cart/:id", removeCart);

router.param("id", cartByID);
module.exports = router;