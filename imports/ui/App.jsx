import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = () => {
    Meteor.call('tasks.list', (err, res) => {
      if (!err) setTasks(res);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (title) {
      Meteor.call('tasks.insert', title, () => {
        setTitle("");
        fetchTasks();
      });
    }
  };

  const completeTask = (id) => {
    Meteor.call('tasks.complete', id, fetchTasks);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.completed ? "(completed)" : ""}
            <button onClick={() => completeTask(task.id)}>Complete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default App;
