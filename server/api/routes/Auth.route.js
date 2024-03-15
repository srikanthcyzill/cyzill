import Express from "express";
import { google, login, logout, signup, facebook, apple } from "../controllers/AuthController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = Express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', verifyToken, logout)
router.post('/google', google)
router.post('/facebook', facebook)
router.post('/apple', apple)

export default router;
