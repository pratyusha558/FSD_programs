import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Db Connection
const mongo_uri = process.env.MONGO_URI;
const dbName = process.env.DB_Name;

console.log("Mongo URI exists:", !!mongo_uri);
console.log("Database name:", dbName);

mongoose.connect(mongo_uri, { dbName })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log("Connection failed:", err.message);
  });

//Schema
const postSchema = new mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
});

const post = mongoose.model('post',postSchema);

//CRUD
//create
app.post("/api/v1/posts" , async(req,res)=>{
  try{
    const newpost = new post(req.body);
    const savedpost = await newpost.save();
    res.status(201).json({
      message:"Created sucessfully",
      data:savedpost
    });
  }catch(err){
    res.status(500).json({message:"Error while creating",data:err.message});
  }
});

//Read all
app.get("/api/v1/posts" , async(req,res)=>{
  try{
    const readpost = new post(req.body);
    const savedpost = await readpost.save();
    res.status(201).json({
      message:"Read sucessfully",
      data:savedpost
    });
  }catch(err){
    res.status(500).json({message:"Error while reading",data:err.message});
  }
});

//Read by Id
app.get("/api/v1/posts/:id" , async(req,res)=>{
  try{
    const post = new post.findById(req.params.id);
    if(post){
      res.status(201).json({
        message:"Read by Id",
        data : post
      });
    }else{
      res.status(404).json({message:"Not found"});
    }
  }catch(err){
    res.status(500).json({message:"Error",data:err.message});
  }
});


//Update
app.put("/api/v1/posts/:id" , async(req,res)=>{
  try{
    const post = new post.findByIdAndUpdate(req.params.id, req.body);
    const savedpost = await post.save();
    if(post){
    res.status(201).json({
      message:"updated sucessfully",
      data:savedpost
    });
  }else{
    res.status(404).json({message:"Not found"});
  }
  }catch(err){
    res.status(500).json({message:"Error",data:err.message});
  }
});


//Delete
app.delete("/api/v1/posts/:id" , async(req,res)=>{
  try{
    const post = new post.findByIdAndDelete(req.params.id);
    const savedpost = await post.save();
    if (post){
      res.status(201).json({
        message:"Deleted successfully",
        data: savedpost
      });
    }else{
      res.status(404).json({message:"Not found"});
    }
  }catch(err){
    res.status(500).json({message:"Error while creating",data:err.message});
  }
});

//Test routes
app.get("/", (req,res)=>{
  res.status(200).json({message:"API is working"})
});

//start
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));

