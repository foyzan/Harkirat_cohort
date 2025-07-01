const express = require('express');

const app = express()
app.listen(3000, function(){
    console.log('server is running ' + 3000);  
})



app.use(express.json())


app.get("/todo", function(req, res){

    res.send("<h1>hello<h1/>")
})

app.post("/todos", function(req, res){

})

app.put("/completed", function(req, res){

})

app.delete("/", function(){
    
})