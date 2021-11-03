import express from "express";
import {
    createProduct,
    listProduct,
    updateProduct,
    productByID,
    removeProduct,
    readProduct,
    listRelated,
    listSearch
} from "../controllers/productController";
const router = express.Router();

router.get("/list-search", listSearch);
router.get("/list-product", listProduct);
router.get("/list-related-product", listRelated);
router.get("/read-product/:id", readProduct);
router.post("/create-product", createProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/remove-product/:id", removeProduct);

router.param("id", productByID);
module.exports = router;