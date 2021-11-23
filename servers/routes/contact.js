import express from "express";
import {
  listContact,
  createContact,
  contactID,
  readContact,
  removeContact,
  updateContact,
} from "../controllers/contactController";
import { userID } from "../controllers/userControllers";
import { isAuth, isAdmin } from "../controllers/auth";
import { authToken } from "../middleware/authToken";
const router = express.Router();

router.get("/list-contact", listContact);
router.get("/read-contact/:id", readContact);
router.post("/create-contact/:userId", authToken, isAuth, createContact);
router.put("/update-contact/:id/:userId", isAuth, isAdmin, updateContact);
router.delete("/remove-contact/:id/:userId", isAuth, isAdmin, removeContact);
router.param("id", contactID);
router.param("userId", userID);
module.exports = router;
