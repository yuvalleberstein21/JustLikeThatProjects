import users from "../data/mockUser";

export const authUser = (username:string, password:string, done:any) => {
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: "Incorrect username or password" });
    }
};