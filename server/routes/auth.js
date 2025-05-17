const express = require('express');
const passport = require('passport');

const router = express.Router();

// דף login
router.get("/login", (req, res) => {
    res.send(`<form method="post" action="/login">
        <input name="username" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>`);
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ success: true, message: "Logged out successfully" });
    });
});

// post login
router.post("/login", passport.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}));



module.exports = router;
