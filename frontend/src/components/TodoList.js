// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [updateId, setUpdateId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/todos', { title, description });
            setTodos([...todos, response.data]);
            setTitle('');
            setDescription('');
            alert("Item Added")
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
            alert("Item Deleted")
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleUpdateTodo = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/todos/${updateId}`, { title, description });
            const updatedTodos = todos.map(todo => {
                if (todo._id === updateId) {
                    return response.data;
                }
                return todo;
            });
            alert("Item Updated")
            setTodos(updatedTodos);
            setTitle('');
            setDescription('');
            setUpdateId(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const setTodoForUpdate = (id, title, description) => {
        setUpdateId(id);
        setTitle(title);
        setDescription(description);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            {updateId ? <button onClick={handleUpdateTodo}>Update Todo</button> : <button onClick={handleAddTodo}>Add Todo</button>}
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <div>{todo.title}</div>
                        <div>{todo.description}</div>
                        <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                        <button onClick={() => setTodoForUpdate(todo._id, todo.title, todo.description)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
