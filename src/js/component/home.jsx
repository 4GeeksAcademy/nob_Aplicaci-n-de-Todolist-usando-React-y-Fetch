import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const apiUrlGet = `https://playground.4geeks.com/todo/users/gustavo`;
  const apiUrlPost = `https://playground.4geeks.com/todo/todos/gustavo`;

  // Función para manejar el input inicial
  const handleChange = (e) => {
    setName(e.target.value);
  };

  //funcion para manejar la entrada del input
  const changeInput = (e, index) => {
    const newTasks = [...tasks];
    newTasks[index].label = e.target.value; // Cambia solo el label de la tarea
    setTasks(newTasks);
  };

  // Carga las tareas al montar el componente
  useEffect(() => {
    fetch(apiUrlGet)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.todos || []); // Asegúrate de que los datos sean siempre un array
      });
  }, []); // Se ejecuta solo una vez al montar

  // Función para agregar un nuevo input cuando presionas "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && name.trim() !== "") {
      e.preventDefault();
      
      const newTodo = { label: name, is_done: false };

      fetch(apiUrlPost, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => res.json()) // Espera una respuesta en JSON
      .then((data) => {
        setTasks([...tasks, data]); ; // Agrega la nueva tarea al estado
          setName(""); // Limpia el input
        })
        .catch((error) => console.log("Error adding todo: ", error));
    }
  };

  const deletePost = (id) => {
    const apiUrlDeletePost = `https://playground.4geeks.com/todo/todos/${id}`
    fetch(apiUrlDeletePost, {
      method: 'DELETE',
    }).then(() => {
      setTasks(tasks.filter((todo) => todo.id !== id))
    })
  }

  
  return (
    <div>
      <h1 className=" mx-5">TO DO LIST</h1>
      <div className="container d-flex flex-column align-items-center mt-5 position-relative">
        <div className="row w-100 pt-2">
          <div className="col">
            <input
              type="text"
              value={name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Write your homework here"
              className="form-control w-95 pt-2"
            />
          </div>
        </div>
        <ul className="list-group w-95 pt-2 mt-4">
          {tasks.map((todo,index) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center w-100 pt-2"
            >
              <input
                type="text"
                value={todo.label}
                onChange={(e) => changeInput(e, index)}
                className="form-control w-100 pt-2"
                placeholder="Write your homework"
              />
              <button
                onClick={() => deletePost(todo.id)}
                className="btn btn-white m-2"
              >
                x
              </button>
            </li>
          ))}
        </ul>
       
        <footer className="task-counter bg-light text-dark w-100 p-2 text-start mt-3">
          {tasks.length === 0
            ? "There are no pending tasks"
            : `${tasks.length} Pending tasks`}
        </footer>
      </div>
    </div>
  );
};

export default TodoList;



