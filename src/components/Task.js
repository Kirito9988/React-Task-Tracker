import React from 'react';
import { FaTimes, FaCheckSquare, FaUndo } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle, onCheck, isCompleted }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <div className='icons'>
          {' '}
          {isCompleted ? (
            <div>
              <FaCheckSquare
                style={{ color: 'white', cursor: 'pointer' }}
                onClick={() => onCheck.disable}
              />
              { <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(task.id)}
              /> }
              <FaUndo
                style={{ color: 'green', cursor: 'pointer' }}
                onClick={() => onCheck(task.id)}
              />
            </div>
          ) : (
            <div>
              <FaCheckSquare
                style={{
                  color: isCompleted ? 'green' : 'white',
                  cursor: 'pointer',
                  float: 'right',
                }}
                onClick={() => onCheck(task.id)}
              />

              <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(task.id)}
              />
            </div>
          )}
        </div>
      </h3>
      <p>{task.day}</p>

      <p>{task.status}</p>
    </div>
  );
};

export default Task;
