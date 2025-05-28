app.post("/signin", function (req, res) {
    const userName = req.body.userName;
    const pass = req.body.pass;
    let notFinder = false; // <-- This flag is the root of the problem

    for (let i = 0; i < users.length; i++) {
        if (users[i]["userName"] == userName && users[i]["pass"] == pass) {
            const newToken = tokenGenerator();
            users[i]["token"] = newToken;
            res.json({ // <-- FIRST potential response sent here
                msg: newToken,
            });
            notFinder = false;
            break; // Exits the loop after a match is found and response is sent
        } else {
            // This 'else' block will be hit for every user that doesn't match
            // even if a match was found earlier or will be found later.
            notFinder = true;
        }
    }

    // This 'if' block will execute AFTER the loop finishes
    if (notFinder) {
        res.json({ // <-- SECOND potential response sent here (Line 85 in your original stack trace)
            msg: "username or password is wrong!!",
        });
    }
});