const express = require('express');
const JWT = require('jsonwebtoken');
const JWT_SECRET = 'sldflskdf11234';
const {userModel, todoModel} = require('./db')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect("")
// Middleware to parse JSON bodies
app.use(express.json());    


// Basic route  

app.post('/signup', async function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;

    await userModel.create({
        username: username,
        password: password,
        email: email,
        name: name
    })

    res.status(201).send({message: 'You have signed up successfully!'});
} )

app.post('/signin', async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({
        email: email,
        password: password
    });

    console.log(user);
    // If user is found, create a JWT token

    if(user){

        const token = JWT.sign({
            id: user._id
        }, JWT_SECRET);
        res.status(200).send({message: 'You have signed in successfully!',
            token: token
        });
    } else {
        res.status(401).send({message: 'Invalid email or password.'});
    }
} )


app.post('/todo',auth, async function(req, res){
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.userId;
    const done = req.body.done;

    await todoModel.create({
        title: title,
        description: description,
        done: done,
        userID: userId
    })

    res.status(201).send({message: 'Todo created successfully!'});

} )

app.get('/todos', auth, async function(req, res){
    const userId = req.userId;      

    const todos = await todoModel.find({
        userID: userId
    });

    res.status(200).json(todos);
})


// Middleware to authenticate JWT token
function auth(req, res, next) {

    const token = req.headers['token'];

    const decodedData = JWT.verify(token, JWT_SECRET);
    if (decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        res.status(401).json({message: ' invalid token'}); 
    }
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});