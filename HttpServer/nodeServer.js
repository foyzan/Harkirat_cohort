import { createServer } from "node:http";
import fs from "node:fs"
const server = createServer( function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });

    const dataStream = fs.createReadStream("./index.html")

    dataStream.on('data', function(chunk){
        res.write(chunk)
    })

    dataStream.on('end', function(){
        res.end()
    })



    
  } 
  else if (req.url === "/about"){
     
    res.writeHead(200, { "content-type": "text/html" });

     res.end("<h1>about page</h>");

  }
});

server.listen(4000, function () {
  console.log("server is running on porn 4000");
});
