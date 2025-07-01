const express = require('express')

const app = express()
const port = 3000;

let requestCount = 0;
function isoldenough(req, res, next){
    const age = req.query.age;
    if(age > 14){
        next();
    }
    else{
       res.json({   
           msg : "You are not old enough to access ride",
       });
    }
    
}

app.use(function(req, res, next) {
    requestCount++;
    console.log(`Request count: ${requestCount}`);
    next();
})

app.get('/', function(req, res){
    res.json({
        msg : "Welcome to the ride service",
    })
})
app.get('/user', function(req, res){
    res.json({
        msg : "Welcome to the ride service",
    })
})


app.get('/rider1',isoldenough,function(req, res){
    res.json({
        msg : "You are old enough to access ride",
    })
})












app.listen(port, function(err){
    if(err){
        console.log("Error in running the server"); 
    }else
    {
        console.log("Server is running on port: ", port);
    }
})