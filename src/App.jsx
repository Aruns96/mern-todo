import React, { useState, useEffect } from "react";
import CreateTask from "./components/CreateTask";
import axios from "axios";

const App = () => {
  const [todo, SetTodo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/get");
      SetTodo(response.data);
    };
    fetchData();
  }, []);
  const handleEdit = async(id) => {
       
        try{
          const res = await axios.put(`http://localhost:3000/edit/${id}`)
          console.log("edit",res)
          if(res.status){
            location.reload()
          }
        }
        catch(e){
          console.log(e)
        }
        

  };
  const handleDelete = async(id)=>{
        try{
         const response = await axios.delete(`http://localhost:3000/delete/${id}`)
         if(response.status){
          alert(response.data.message)
          location.reload()
         }
           
        }catch(e){
          console.log(e)
        }

  }
  return (
    <div className="grid justify-center items-center ">
      <h1 className="text-3xl font-bold ">To do list</h1>
      <CreateTask />
      {todo.length === 0 ? (
        <h2>no data found</h2>
      ) : (
        todo.map((todo) => (
          <div key={todo._id} className={` ${!todo.available ? 'line-through' : ''}`}>
            {todo.task}
            <span>
              <button
                onClick={() => handleEdit(todo._id)}
                className="bg-black text-white p-1 ml-3"
              >
                completed
              </button>
            </span>
            <span>
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-black text-white p-1 ml-3"
              >
                delete
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
