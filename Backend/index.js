const express = require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const app=express();
app.use(cors())
app.use(express.json())

const PORT=process.env.PORT || 8080;
// schema
const schemaData=mongoose.Schema({
    name:String,
    Email:String,
},{
    timestamps:true
})

const userModel = mongoose.model("user",schemaData)
//http://localhost:8080/
app.get('/',async(req,res)=>{
    const data=await userModel.find({})
res.json({Success:true,data:data})
})
app.get('/:id',async(req,res)=>{
    const {id,...rest}=req.body;
    const data=await userModel.find({_id:req.params.id})
res.json({Success:true,data:data})
})
//create data
//http://localhost:8080/create
app.post('/create',async(req,res)=>{
    console.log(req.body) 
    const data= new userModel(req.body)
    await data.save()
    res.send({success:true,message:"stored data",data})
})
//update
http://localhost:8080/update
app.patch('/update/:id',async(req,res)=>{
    console.log(req.body)
    const {id,...rest}=req.body;
    const data=await userModel.updateOne({_id:req.params.id},rest);
    res.send({Success:true,message:"Stored data successfully",data})
})
//delete
//http://localhost:8080/delete/6547c1c23f6a3775b25a846a
app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id:id})
    res.send({Success:true,message:"Deleted data successfully",data})
})

mongoose.connect("mongodb://127.0.0.1:27017/Forms").then(()=>{
console.log("db connected")
app.listen(PORT,()=>{
    console.log("server is running")
})
}).catch((err)=>console.log(err))

