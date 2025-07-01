const express = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const JWT = require('jsonwebtoken');
const link = require('./connect');
const JWT_SECRET = 'sldflskdf11234';
const { userModel, todoModel } = require('./db')
const app = express();
const port = 3000;
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect(link)
// Middleware to parse JSON bodies
app.use(express.json());


// Basic route  

app.post('/signup', async function (req, res) {
    // Validate request body using zod
        // Define the schema for the request body
            // This schema requires username, password, email, and name to be strings
    const requireBody = z.object({
        username: z.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long'),
        password: z.string().min(6, 'Password must be at least 6 characters long').max(63, 'Password must be at most 63 characters long'),
        email: z.string().email("provide a valid email"),
        name: z.string().min(3, "minimum 3 character").max(40, "maximum 40 character")
    })

    const parsedBody = requireBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ message: 'Invalid request body', errors: parsedBody.error.issues });
    }


    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;



    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await userModel.create({
            username: username,
            password: hashedPassword,
            email: email,
            name: name
        })

    } catch (error) {
        res.json({ message: 'user already exist', error: error.message });
        return;
    }
    res.status(201).send({ message: 'You have signed up successfully!' });
})

app.post('/signin', async function (req, res) {
    // Validate request body using zod
        // Define the schema for the request body
    requireBody = z.object({
        email: z.string().email("provide a valid email"),
        password: z.string().min(6, 'Password must be at least 6 characters long').max(63, 'Password must be at most 63 characters long'),
    })

    const parsedBody = requireBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ message: 'Invalid request body', errors: parsedBody.error.issues });
    }

    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({
        email: email,
    });

    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password.' });
    }
    // If user is found, create a JWT token

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = JWT.sign({
            id: user._id
        }, JWT_SECRET);
        res.status(200).send({
            message: 'You have signed in successfully!',
            token: token
        });
    } else {
        res.status(401).send({ message: 'Invalid email or password.' });
    }
})


app.post('/todo', auth, async function (req, res) {
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

    res.status(201).send({ message: 'Todo created successfully!' });

})

app.get('/todos', auth, async function (req, res) {
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
        res.status(401).json({ message: ' invalid token' });
    }
}


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});