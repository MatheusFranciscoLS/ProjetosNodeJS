"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    setTodos(data.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") {
      alert("A tarefa não pode estar vazia.");
      return;
    }

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await response.json();
    setTodos([...todos, data.data]);
    setNewTodo("");
  };

  const toggleCompleteTodo = async (id, completed) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
    const data = await response.json();
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: data.data.completed } : todo
      )
    );
  };

  const editTodo = (todo) => {
    setEditingTodoId(todo._id);
    setEditedTodoTitle(todo.title);
  };

  const saveEditTodo = async () => {
    if (editingTodoId === null) return;

    const response = await fetch(`/api/todos/${editingTodoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editedTodoTitle }),
    });
    const data = await response.json();
    setTodos(
      todos.map((todo) =>
        todo._id === editingTodoId ? { ...todo, title: data.data.title } : todo
      )
    );
    setEditingTodoId(null);
    setEditedTodoTitle("");
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      {editingTodoId === null ? (
        <>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Adicionar Tarefa</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompleteTodo(todo._id, todo.completed)}
                />
                {todo.title} - {todo.completed ? "Concluída" : "Pendente"}
                <button onClick={() => editTodo(todo)}>Editar</button>
                <button onClick={() => deleteTodo(todo._id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>
          <h2>Editando Tarefa</h2>
          <input
            type="text"
            value={editedTodoTitle}
            onChange={(e) => setEditedTodoTitle(e.target.value)}
          />
          <button onClick={saveEditTodo}>Salvar</button>
          <button onClick={() => setEditingTodoId(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
