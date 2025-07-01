const express = require('express');
const {createTodo, updateTodo} = require('./type')
const app = express()
app.listen(3000, function(){
    console.log('server is running ' + 3000);  
})



app.use(express.json())


app.get("/todo", function(req, res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload)

    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "invalid input"
        })
    }
    
})

app.post("/todos", function(req, res){

})

app.put("/completed", function(req, res){
    const updatedPayload = req.body;
    const parsedPayload = updatedTodo.safeParse(updatedPayload)
    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "invalid input"
        })
    }
})

git.post()