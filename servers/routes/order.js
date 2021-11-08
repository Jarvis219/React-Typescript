import express from "express";
import {
    addOrder
} from "../controllers/order";
const router = express.Router();

// router.get("/list-category", listCategory);
// router.get("/read-category/:id", readCategory);
router.post("/order", addOrder);
// router.put("/update-category/:id", updateCategory);
// router.delete("/remove-category/:id", removeCategory);

// router.param("id", categoryByID);
module.exports = router;