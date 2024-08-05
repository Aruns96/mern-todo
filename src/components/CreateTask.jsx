import React, { useState } from 'react'
import axios from "axios"

const CreateTask = () => {
    const [val,setVal] = useState("")

    const handleAdd =async()=>{
        
        try{
            let data = {task:val}
            console.log(data)
            const response = await axios.post("http://localhost:3000/add"
                ,data
            )
          
               if(response.status){
                setVal("")
                location.reload()
               }
                
               
           
        }catch(e){
            console.log(e)
        }
        
    }
  return (
    <div className='container'>
   <label>Enter a task</label>
   <input value={val} onChange={(e)=>setVal(e.target.value)} className='border border-black ml-3' type="text" required/>
   <button onClick={handleAdd} className='bg-black text-white p-1 ml-3'>add</button>
    </div>
    
  )
}

export default CreateTask