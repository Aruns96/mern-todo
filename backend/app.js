const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const Todo = require("./models/todo")



const app = express();
app.use(express.json())
app.use(cors())

app.get("/get",async(req,res)=>{
    try{
        let data = await Todo.find()
        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
    
})
app.get("/gettodo/:id",async(req,res)=>{
    try{
        const id = req.params.id
        let data = await Todo.findById(id)
        res.status(200).json(data)
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
    
})

app.post("/add",async(req,res)=>{
    try{
        const task = req.body.task;
        //console.log(task)
        if(task==undefined || task.length===0){
            return res.status(400).json({err:"bad params"})
        }
        const todo = new Todo({
            task:task
        })
        await todo.save()
        res.status(201).json({message:"todo created.."})
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
    
})
app.put("/edit/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(id)
        await Todo.findByIdAndUpdate({_id:id},{
         available:false
        })
        res.status(200).json({message:"edited.."})
       
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
    
})
app.delete("/delete/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(id)
        await Todo.findByIdAndDelete(id)
        res.status(200).json({message:"success"})
       
    }catch(e){
        console.log(e)
        res.status(500).json({error:e})
    }
    
})

mongoose.connect(process.env.MONGO)
.then(result=>{
    app.listen(3000,()=>{
        console.log("server is listening..")
    })
}).catch(e=>console.log(e))
