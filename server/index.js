const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const { authUser } = require('./middlewares/authUser');
const authRoutes = require('./routes/auth');
const { checkAuthenticated } = require('./middlewares/CheckIsAuthenticated');


const app = express();


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "JustLikeThatSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())


passport.use(new LocalStrategy(authUser))

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    const user = { id: 1, name: "Yuval" };
    done(null, user);
});
// Routes
app.use(authRoutes);

app.get('/', (req, res) => {
    res.send("Hello world !");
});

app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.send(`Welcome ${req.user.name}`);
});



const PORT = 8001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})


