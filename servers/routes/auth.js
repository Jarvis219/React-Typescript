import express from 'express';
import {
    registerControllers,
    verifyEmail,
    verifyEmailCheck,
    signin,
    signout
} from '../controllers/auth'
const router = express.Router();


// đăng ký
router.post("/register", registerControllers);

// check xác thực email
router.get("/verify-email", verifyEmail);
// đăng nhập check email kích hoạt
router.post("/login", verifyEmailCheck, signin);
//đăng xuất email
router.get('/signout', signout);
module.exports = router