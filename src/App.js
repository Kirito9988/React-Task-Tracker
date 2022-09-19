import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router , Route , Routes } from 'react-router-dom';
function App() {
  const [tasks, setTasks] = useState(
    [
 {
     id:1,
     text: "asdddd",
     day: "sfaff",
     reminder: true,
 },
 {
     id:2,
     text: "asd43534ssd",
     day: "sfa4343ff",
     reminder: true,
 }
]
 )


 //addtask
const addTask = (task) => {
  console.log(task);
  const id = Math.floor(Math.random() * 10000 ) + 1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask])
} 


//delete
 const deleteTask = (id) => {
    console.log('delete' , id)

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

    <Router>
    <div className="container">
      <Header title="Task Tracker"  />
      <AddTask  onAdd={addTask} />
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      <Footer  />
      <Routes>
      <Route path='/about' element={<About />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
