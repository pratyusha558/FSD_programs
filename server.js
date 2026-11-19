import http from 'http';
const server = http.createServer((req,res) => {
  res.writeHead(200,{ 'Content-Type' : "text/html"});
  res.write("<h1>My server</h1>");
  res.end();
});


server.listen(3000,() => {
  console.log("Server is running");
});
