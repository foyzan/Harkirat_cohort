const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors')
const JWT_SECRET = "sklsfdfl";
const app = express();
const port = 3000;


const users = [

];

app.use(express.json())
app.use(cors({
      origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));



app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
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


function tokenValidation (req, res, next) {
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
            msg: "invalid token a"
        })
    }
}

app.get('/me',tokenValidation, function (req, res) {
    const user = req.verifyUser;
    return res.json(user);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})