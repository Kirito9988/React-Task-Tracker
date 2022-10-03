import React from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';

const Completed = ({ tasks,onDelete, onCheck }) => {
  return (
    <div className='complete'>
      <h3>Completed:</h3>
      <Link to='/'>Go Back</Link>

      {tasks.map((task, index) => {
        if (task.status === 'completed') {
          return (
            <Task
              key={index}
              task={task}
              onDelete={onDelete}
              onCheck={onCheck}
              isCompleted={true}
            />
          );
        }
      })}
    </div>
  );
};

export default Completed;
