import { createServer } from "node:http";
import fs from "node:fs"
import fsPromise from "node:fs/promises"
import { json } from "node:stream/consumers";
const server = createServer( function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });

    const dataStream = fs.createReadStream("./index.html")


    dataStream.pipe(res)
    // dataStream.on('data', function(chunk){
    //     res.write(chunk)
    // })

    // dataStream.on('end', function(){
    //     res.end()
    // })



    
  } 
  else if (req.url === "/about"){
     
    res.writeHead(200, { "content-type": "text/html" });

     res.end("<h1>about page</h>");

  }
  else if(req.url === "/expense") {

    if(req.method === 'POST'){
      
      let buffer = '';
      req.on( 'data', function(chunk){
        buffer = buffer + chunk.toString()
      })

      req.on('end', async function(){
        const db = await fsPromise.readFile('./DB.json')
        
        const dbData = JSON.parse(db);

        dbData.push(JSON.parse(buffer))

        await fsPromise.writeFile('./DB.json', JSON.stringify(dbData, null, 2))

        res.end("OK")
      })

    }
    else if(req.method === 'GET'){
      // read data from json db
      async function readBD(){
        const data = await fsPromise.readFile('./DB.json')

        res.end(data)
      }

      // send it to the client
      readBD()
      
    }

  }
});

server.listen(4000, function () {
  console.log("server is running on porn 4000");
});
