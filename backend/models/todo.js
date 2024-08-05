const mongoose = require("mongoose");



const Scheme = mongoose.Schema;

const todoSchema = new Scheme({
    task:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        default:true
    }
})


module.exports = mongoose.model("todo",todoSchema)