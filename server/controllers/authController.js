
const { users } = require("../data/mockUser");
const { generateTokens } = require("../utils/tokenUtils");
const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
    res.send(`<form method="post" action="/login">
        <input name="username" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
    </form>`);
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { id: user.id, name: user.name };
    const { accessToken, refreshToken } = generateTokens(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, message: "Logged in" });
};

exports.logout = (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ success: true, message: "Logged out" });
};

exports.refreshToken = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const payload = { id: user.id, name: user.name };
        const { accessToken } = generateTokens(payload);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000,
        });

        res.json({ message: "Access token refreshed" });
    });
};

exports.getMe = (req, res) => {
    res.json({ message: "You are authenticated", user: req.user });
};