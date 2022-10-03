import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Completed from './components/Completed';
import { Link } from 'react-router-dom';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tfs = await fetchTasks();
      setTasks(tfs);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    let url1 = 'http://localhost:5001/tasks';
    const res = await fetch(url1);
    const data = await res.json();

    console.log(data);
    return data;
  };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5001/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    console.log('delete', id);
    await fetch(`http://localhost:5001/tasks/${id}`, {
      method: 'DELETE',
    });
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const onCheck = async (id) => {
    let taski = null;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        taski = JSON.parse(JSON.stringify(tasks[i]));
      }
    }
    taski.status === 'active'
      ? (taski.status = 'completed')
      : (taski.status = 'active');

    const res = await fetch(`http://localhost:5001/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taski),
    });

    const data = await res.json();
    console.log(data);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          let st = null;

          console.log('statusssss', task.text, task.status);
          if (task.status === 'active') {
            st = 'completed';
          } else {
            st = 'active';
          }
          console.log('sttttt', st);
          return { ...task, status: st };
        } else {
          return task;
        }
      })
    );
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, reminder: !task.reminder };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <BrowserRouter>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}

                {
                tasks.filter(task  => task.status === 'active').length > 0 ? (
                  <>
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                      onCheck={onCheck}
                    />
                    <Link to='/completed'>Completed</Link>
                  </>
                ) : (
                  <div>
                    <p>No task to show</p>
                    <Link to='/completed'>Completed</Link>
                  </div>
                )}
              </>
            }
          />

          <Route path='/about' exact element={<About />} />

          <Route
            path='/completed'
            element={
              <>
                {tasks.filter(task=> task.status === 'completed').length > 0 ? (
                  <Completed
                    tasks={tasks}
                    onDelete={deleteTask}
                    onCheck={onCheck}
                  />
                ) : (
                  <div>
                    <p>No task to show</p>
                    <Link to='/'>Go Back</Link>
                  </div>
                )}
              </>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
