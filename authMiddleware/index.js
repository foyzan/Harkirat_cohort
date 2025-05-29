const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "sklsfdfl";
const app = express();
const port = 3000;


const users = [

];

app.use(express.json())

app.post('/signup', function (req, res) {
    const username = req.body.username;
    const pass = req.body.pass;

    let isFind = null;


    if (users.length != 0) {
        isFind = users.find(function (user) {
            return user.username == username;
        })

    }

    if (isFind) {
        return res.json({
            msg: "this username has already been taken"
        })
    } else {
        users.push({
            username: username,
            pass: pass
        })
        return res.json(users)
    }




})
app.post('/signin', function (req, res) {
    const username = req.body.username;
    const pass = req.body.pass;

    let isFind = users.find(function (user) {
        return user.username == username && user.pass == pass;
    });

    if (isFind) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        return res.json({
            token: token
        })
    } else {
        return res.json({
            msg: "invalid username or password"
        })
    }

})


app.use(function (req, res, next) {
    const token = req.headers.token;

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);

        const username = decodedData.username;
        let isFind = users.find(function (user) {
            return user.username == username;
        })

        req.verifyUser = isFind;
        next();

    } catch (error) {
        return res.json({
            msg: "invalid token"
        })
    }
})

app.get('/me', function (req, res) {
    const user = req.verifyUser;
    return res.json(user);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})