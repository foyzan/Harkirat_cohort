const express = require('express')

const app = express()


const todos = [
    {
        id: 1,
        name: "python project",
        completed: true
    },
    {
        id: 2,
        name: "node js project",
        completed: false
    }
]

app.listen(3000, function(){
    console.log("server is running 3000")
})

app.use(express.json())

app.get('/', function(req, res){
    res.send('this is a todo app')
})

app.get('/todos', function(req, res){
    res.json(todos)
})


app.get('/todos/:id', function(req, res){
    const id = Number(req.params.id);

    todos.forEach(function(todo){
        todo.id === id;
        res.json(todo);
    })
})

app.post('/todos', function(req, res){
    const todo = req.body

    todos.push({
        id : todos.length++,
        name: todo.name,
        completed: todo.completed
    })
    res.json(todos)
})