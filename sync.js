import fs from 'fs';


const data = "Hello guys";
fs.writeFileSync("sample.txt",data,'utf-8');
console.log("file writrten");


const readData = fs.readFileSync("sample.txt",'utf-8');
console.log(readData);
console.log("file read");



for(let i = 0;i<5;i++){
  console.log(i);
}


fs.appendFileSync("sample.txt","Bye",'utf-8');


