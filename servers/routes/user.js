import express from "express";
import {
  listUser,
  userID,
  read,
  updateUser,
  removeUser,
} from "../controllers/userControllers";

const router = express.Router();

router.get("/users", listUser);
router.get("/read-user/:userId", read);
router.put("/update-user/:userId", updateUser);
router.delete("/remove-user/:userId", removeUser);

router.param("userId", userID);

module.exports = router;
