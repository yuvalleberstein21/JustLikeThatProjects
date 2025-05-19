const express = require("express");
const router = express.Router();
const {
    login,
    logout,
    refreshToken,
    getMe,
    loginPage
} = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/CheckIsAuthenticated");




router.get("/login", loginPage);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", refreshToken);
router.get("/me", authenticateToken, getMe);

module.exports = router;