const { users } = require("../mockUser");

module.exports.authUser = (username, password, done) => {
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: "Incorrect username or password" });
    }
};