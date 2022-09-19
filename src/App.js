import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter  , json, Route , Routes } from 'react-router-dom';
function App() {
  const [tasks, setTasks] = useState(
    []
 )

    useEffect(()=>{

      const getTasks = async () => {
        const tfs = await fetchTasks();
        setTasks(tfs)
      }

      getTasks();
    },[])

    //fetch
    const fetchTasks = async() => {
      let url1 = "http://localhost:5001/tasks"
      const res = await fetch(url1)
      const data = await res.json()

      console.log(data)
      return data
    }
 //addtask
const addTask = async (task) => {
  console.log(task);
  // const id = Math.floor(Math.random() * 10000 ) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])


  const res = await fetch( `http://localhost:5001/tasks`, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(task)
  }
  
  )
  const data = await res.json()

setTasks ([...tasks, data])
} 


//delete
 const deleteTask = async(id) => {
    console.log('delete' , id)
    await fetch(`http://localhost:5001/tasks/${id}`,
    {
      method: 'DELETE',
    }
    )
    setTasks(tasks.filter((task)=>{
      return task.id !== id
    }))
 }

//toggle
const toggleReminder = (id) => {
  console.log("dkkkk")
  setTasks(tasks.map((task)=>{
    if (task.id === id )
     {
      return { ...task, reminder: !task.reminder }
    }
    else {
      return task
    }
  }))
}

  return (

    <div className="container">
      <Header title="Task Tracker"  />
      <AddTask  onAdd={addTask} />
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      <Footer  />

<BrowserRouter>
<Routes>
<Route path="/about" element={<About />} />
</Routes>
</BrowserRouter>
    </div>

  );
}

export default App;
