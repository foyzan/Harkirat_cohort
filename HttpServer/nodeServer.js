import {createServer} from 'node:http';


const server = createServer(function(req, res){

    console.log("request received")

    res.end("Hello node Server")
})