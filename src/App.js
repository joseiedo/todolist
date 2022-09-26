import React from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button/Button";

const App = () => {
  const defaultTasks = JSON.parse(window.localStorage.getItem("TASKS")) || [];
  const [task, setTask] = React.useState("");
  const [tasks, setTasks] = React.useState(defaultTasks);
  const [taskToBeEditted, setTaskToBeEditted] = React.useState(null);
  const [isEditingTask, setIsEditingTask] = React.useState(false);
  const inputElement = React.useRef();

  React.useEffect(() => {
    window.localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  React.useEffect(() => {
    inputElement.current.focus();
  }, []);

  function handleTask() {
    if (inputElement.current.value) {
      setTasks([
        ...tasks,
        { id: uuidv4(), description: task, completed: false },
      ]);

      inputElement.current.value = "";
    }
  }

  function handleRemove(idTask) {
    const newListOfTasks = tasks.filter((task) => task.id !== idTask);
    setTasks(newListOfTasks);
  }

  function handleEdit(task) {
    const inputTask = inputElement.current;
    inputTask.focus();
    inputTask.value = task.description;

    setIsEditingTask(true);
    setTaskToBeEditted(task);
  }

  function handleConfirmTaskChange() {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskToBeEditted.id) {
          return { ...task, description: inputElement.current.value };
        } else {
          return task;
        }
      })
    );

    inputElement.current.value = "";
    setIsEditingTask(false);
  }

  function handleTaskCheckbox(idTask) {
    setTasks(
      tasks.map((task) => {
        if (task.id === idTask) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  return (
    <div className="container">
      <div className="wrapper-header">
        <h1>Tasks</h1>
        <div className="wrapper-input">
          <input
            className="campoTexto"
            type="text"
            ref={inputElement}
            onChange={({ target }) => setTask(target.value)}
          />
          {isEditingTask ? (
            <Button
              text={"Confirmar"}
              onClick={handleConfirmTaskChange}
              style={{ backgroundColor: "green" }}
            />
          ) : (
            <Button text={"Adicionar"} onClick={handleTask} />
          )}
        </div>
      </div>
      <ul className="card">
        {tasks.length ? (
          tasks.map((task) => {
            return (
              <li key={task.id}>
                <p
                  style={
                    task.completed ? { textDecoration: "line-through" } : {}
                  }
                >
                  {task.description}
                </p>

                <div className="task-options">
                  <Button
                    text={"remover"}
                    style={{ marginRight: "5px", backgroundColor: "#F44336" }}
                    onClick={() => handleRemove(task.id)}
                  />
                  <Button
                    text={"Editar"}
                    style={{ backgroundColor: "#009688" }}
                    onClick={() => handleEdit(task)}
                  />
                  <input
                    type={"checkbox"}
                    value="task"
                    checked={task.completed}
                    onChange={() => handleTaskCheckbox(task.id)}
                  />
                </div>
              </li>
            );
          })
        ) : (
          <li style={{ textAlign: "center" }}>Ei! Adicione uma tarefa.</li>
        )}
      </ul>
    </div>
  );
};

export default App;
