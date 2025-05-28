const express = require('express');
const port = 3000;
const app = express()
app.use(express.json())

const users = [{
    userName: "josh",
    pass: "2321233",
    token: null
}]

function tokenGenerator() {
    // Define the characters that can be used in the token
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    // You can adjust the desired length of the token here
    const tokenLength = 16; 

    for (let i = 0; i < tokenLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



app.post('/signup', function(req, res){
    const userName = req.body.userName;
    const pass = req.body.pass;

    users.push({
        userName: userName,
        pass: pass,
        token: null
    })

    res.json(users)

})

app.post('/signin', function(req, res){
    const userName = req.body.userName;
    const pass = req.body.pass;
    let notFinder = false;
    for(let i = 0; i < users.length; i++){
        if(users[i]["userName"] == userName && users[i]["pass"] == pass)
        {
            const newToken = tokenGenerator();
            users[i]["token"] = newToken; 
            res.json({
                msg : newToken
            })

            break;
        }
        else{
           notFinder = true;
        }
    }

    if(notFinder){
        res.json({
            msg : "username or password is wrong!!"
        })
    }
})






app.listen(port, function(){
    console.log("server is running on ", port);
})