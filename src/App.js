import React, {useState} from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const addTask = () => {
    if (taskInput.trim() === '')return;

    if (isEditing){
      setTasks(tasks.map(task =>(task.id === currentTask.id ?{...task,text: taskInput} : task)));
      setIsEditing(false);
    }else{
      const newTask = {id: Date.now(), text: taskInput};
      setTasks([...tasks, newTask]);
    }

    setTaskInput('');
  };

  const editTask = task =>{
    setTaskInput(task.text);
    setIsEditing(true);
    setCurrentTask(task);
  };

  const deleteTask = id =>{
    setTasks(tasks.filter(task => task.id !== id));
  };


  return (
    <div>
      <div className='app-container'>
          <h1>Student Daily To-Do-List</h1>
        <div className="input-container">
          <input type='text' value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder='Enter the task'/>
          <button onClick={addTask}>{isEditing ? 'Update Task' : 'Add Task'}</button>
        </div>
        <ul className="task-list">
          {tasks.map(task =>(
            <li key={task.id} className='task-item'>
              <span>{task.text}</span>
              <div className="task-actions">
                <button onClick={() => editTask(task)}>Edit</button>
                <button className='btn' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
