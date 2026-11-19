import fs from 'fs';


const data = "Hello guys this is Async";
fs.writeFile("sample2.txt",data,'utf-8',(err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('File written successfully!');
});


let readData = fs.readFile("sample2.txt",'utf-8', (err,Data)=>{
  if(err) {
    console.log(err);
    return;
  }
  console.log(readData);
}
);

for(let i = 0;i<5;i++){
  console.log(i);
}


fs.appendFile('sample2.txt', ' New line', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Done');
    }
});