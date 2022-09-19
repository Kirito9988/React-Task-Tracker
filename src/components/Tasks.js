import { useState } from 'react'
import Task from './Task'
// const tasks = [
//     {
//         id:1,
//         text: "asd",
//         day: "sfaff",
//         reminder: true,
//     },
//     {
//         id:2,
//         text: "asd43534ssd",
//         day: "sfa4343ff",
//         reminder: true,
//     }
// ]
const Tasks = ({tasks, onDelete, onToggle  }) => {

  return (
    <>
     {
        tasks.map((task,index) => (
            <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
        )
        )
     }
    </>
  )
}

export default Tasks