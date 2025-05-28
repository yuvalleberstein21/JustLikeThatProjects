import express from "express";
import {
  login,
  loginPage,
  logout,
  refreshToken,
  getMe
} from "../controllers/authController";

import {authenticateToken} from "../middlewares/CheckIsAuthenticated";

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/me", authenticateToken, getMe);

export default router;