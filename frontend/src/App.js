// client/src/App.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractJSON from "./TodoList.json";

const contractABI = contractJSON.abi;
const contractAddress = "0x6919B2fe33515C85336ebfA0693D09Acc7b05C6F"; 

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadProviderAndContract = async () => {
      if (!window.ethereum) return alert("MetaMask is not installed!");

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        const tempContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(tempContract);

        loadTodos(tempContract);
      } catch (error) {
        console.error("Error loading contract:", error);
      }
    };

    loadProviderAndContract();
  }, []);

  const loadTodos = async (contract) => {
    try {
      const todoList = await contract.getTodos();
      setTodos(todoList);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async () => {
    if (!contract) return;

    try {
      const tx = await contract.createTodo(newTodo);
      await tx.wait();
      setNewTodo('');
      loadTodos(contract);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const toggleTodo = async (id) => {
    if (!contract) return;

    try {
      const tx = await contract.toggleTodoCompleted(id);
      await tx.wait();
      loadTodos(contract);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <h1>Todo List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px"
          }}
        />
        <button
          onClick={createTodo}
          style={{
            padding: "8px 15px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add Todo
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
              width: "300px",
              marginLeft: "auto",
              marginRight: "auto",
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "gray" : "black"
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: "10px" }}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
