const http=require('http');
const fs=require('fs');
const path=require('path');

const port= 3001

const server=http.createServer((req,res)=>{
   const filePath= path.join(__dirname, req.url==='/' ? "index.htm": req.url)
   const extName=String(path.extname(filePath).toLowerCase())
   const mimeTypes={
    '.html': 'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'text/png', 
   }

   const conentType=mimeTypes[extName] || 'application/octet-stream'

   fs.readFile(filePath,(err,content)=>{
    if(err){
        if(err.code==="ENOENT"){
            res.writeHead(404,{"content-Type": 'text/html'})
            res.end("404: File Not Found BRooooo");
        }
    }
    else{
          res.writeHead(200,{'Content-Type':conentType});
          res.end(content,'utf-8');
    }

   })
});
server.listen(port,()=>{
    console.log(`the server is running on ${port}`);
})