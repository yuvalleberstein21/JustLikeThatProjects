const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

