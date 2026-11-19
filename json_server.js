import http from 'http';
const students = []
const server = http.createServer((req,res) => {
  const {method,url} = req;
  if(method === 'POST' && url === '/students'){
    let body = "";
    req.on("data",(chunk) => {
      body += chunk.toString();
    });
    req.on("end",() => {
      const newstudent = JSON.parse(body);
      students.push(newstudent);
      res.writeHead(200,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Student created successfully",
          data : newstudent
        }),
      );
    });
  }

  //read all students
  else if(method === 'GET' && url === '/students'){
    res.writeHead(200,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Student read",
          data : students
        }),
      );
  }
  //Read student by ID
  else if (method === 'GET' && url.startsWith('/students/')){
    const sid = parseInt(url.split('/')[2]);
    const student = students.find((stu) => stu.id === sid);
    if (student){
      res.writeHead(200,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Detailed read",
          data : student
        }),
      );
    }
    else{
      res.writeHead(404,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Not found",
        }),
      );
    }
  }
  //update
  else if (method === 'Put' && url.startsWith('/students/')){
    const studentid = parseInt(url.split('/')[2]);
    let body = "";
    req.on("data",(chunk) => {
      body += chunk.toString();
    });
    req.on('end',() =>{
      const newstudent = JSON.parse(body);
      const studentindex = students.findIndex((stu)=>stu.id === studentid);
      if (studentid !== -1){
        students[studentindex] = {...students[studentindex],...newstudent};
        res.writeHead(200,{'content-type' : "application/json"});
        res.end(
        JSON.stringify({
          message : "students updated",
          data : students[studentindex]
        }),
      );
      }
      else{
        res.writeHead(404,{"content-type":"application/json"});
        res.end(
          JSON.stringify({
          message : "Not found",
          }),
        );
      }
    })
  }
  else if (method === 'DELETE' && url.startsWith('/students/')){
    const sid = parseInt(url.split('/')[2]);
    const student = students.find((stu) => stu.id === sid);
    if (student !== -1){
      const student = students.splice(studentindex,1);
      res.writeHead(200,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Student deleted",
          data : student[0]
        }),
      );
    }
    else{
      res.writeHead(404,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Not found"
        }),
      );
    }
  }
  //other routes
  else{
      res.writeHead(404,{"content-type":"application/json"});
      res.end(
        JSON.stringify({
          message : "Not found",
        }),
      );
    }
});
server.listen(4000,()=>{
console.log("server running at http://localhost:4000/students"); 
});