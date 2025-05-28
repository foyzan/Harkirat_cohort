const express = require("express");
const port = 3000;
const app = express();
app.use(express.json());

const users = [
    {
        userName: "josh",
        pass: "2321233",
        token: null,
    },
];

function tokenGenerator() {
    // Define the characters that can be used in the token
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    // You can adjust the desired length of the token here
    const tokenLength = 16;

    for (let i = 0; i < tokenLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.post("/signup", function (req, res) {
    const userName = req.body.userName;
    const pass = req.body.pass;

    let isSignIn = false;
    let isTakenUsername = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i]["userName"] == userName && users[i]["pass"] == pass) {
            isSignIn = true;
            break;
        } else if (users[i]["userName"] == userName) {
            isTakenUsername = true;
            break;
        }
    }

    if (isTakenUsername) {
        res.json({
            msg: "Your username already taken please choose a uniq ones",
        });
    } else {
        if (isSignIn) {
            res.json({
                msg: "you have already signup please signin",
            });
        } else {
            users.push({
                userName: userName,
                pass: pass,
                token: null,
            });
            res.json(users);
        }
    }
});

app.post("/signin", function (req, res) {
    const userName = req.body.userName;
    const pass = req.body.pass;

    let foundUser = null; // Use a variable to store the found user, or null if not found

    for (let i = 0; i < users.length; i++) {
        if (users[i]["userName"] == userName && users[i]["pass"] == pass) {
            foundUser = users[i];
            break; // Found the user, exit loop
        }
    }

    if (foundUser) {
        const newToken = tokenGenerator();
        foundUser.token = newToken; // Update the token on the actual user object
        return res.json({ // <-- IMPORTANT: Added 'return' here
            msg: newToken,
        });
    } else {
        // Only send this response if no user was found after checking all
        return res.json({ // <-- IMPORTANT: Added 'return' here
            msg: "username or password is wrong!!",
        });
    }
});

app.listen(port, function () {
    console.log("server is running on ", port);
});
