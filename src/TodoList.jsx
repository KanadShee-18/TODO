import React, { useState } from "react";
import "./TodoList.css";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const TodoList = () => {
  let [todos, setTodos] = useState([
    { task: "Sample Task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");
  let [taskDone, setTaskDone] = useState(false);

  const addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  const updatedTodos = (event) => {
    setNewTodo(event.target.value);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  const makeAllDone = () => {
    let newTodos = todos.map((prevTodos) => {
      return {
        ...prevTodos,
        isDone: !prevTodos.isDone,
      };
    });
    setTodos(newTodos);
  };

  const markAsDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  return (
    <div className="todoContainer">
      <h3 className="todoHeading">
        <i className="fa-solid fa-file-pen"></i> &nbsp;Todo List{" "}
      </h3>
      <div className="inputField">
        <input
          type="text"
          placeholder="Add your todo... "
          className="inputBox"
          value={newTodo}
          onChange={updatedTodos}
        />
        <button onClick={addNewTask} className="addBtn">
          Add Task
        </button>
      </div>
      <h4>Tasks To Do</h4>
      {todos.length === 0 ? (
        <h3>No tasks to do</h3>
      ) : (
        <div className="todoTasks">
          {todos.map((todo) => (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              key={todo.id}
              className="tasks"
            >
              <li>
                <p
                  style={todo.isDone ? { textDecoration: "line-through" } : {}}
                >
                  {todo.task}
                </p>
                <button onClick={() => markAsDone(todo.id)} className="doneBtn">
                  {todo.isDone ? (
                    <i className="fa-solid fa-square-check"></i>
                  ) : (
                    <i className="fa-regular fa-square-check"></i>
                  )}
                </button>
              </li>
              <div className="btns">
                <button className="dltBtn" onClick={() => deleteTodo(todo.id)}>
                  Delete<i className="fa-solid fa-trash dltIcon"></i>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <button className="uppercaseBtn" onClick={makeAllDone}>
        All Task Done
      </button>
    </div>
  );
};

export default TodoList;
