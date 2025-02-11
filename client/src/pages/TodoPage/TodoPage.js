import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoCategory from '../../components/TodoCategory/TodoCategory';
import './TodoPage.css';

const TodoPage = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend on page load
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/todos/categories`, { withCredentials: true })
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const addCategory = async () => {
    const name = prompt('Enter category name:');
    if (!name) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/todos/category`,
        { name },
        { withCredentials: true }
      );
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/category/${id}`, { withCredentials: true });
      setCategories(categories.filter(category => category._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const addTodo = async (categoryId, todoText) => {
    if (!todoText.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/todos/todo`,
        { text: todoText, categoryId },
        { withCredentials: true }
      );

      setCategories(categories.map(category =>
        category._id === categoryId
          ? { ...category, todos: [...category.todos, response.data] }
          : category
      ));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (categoryId, todoId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/todo/${todoId}`, { withCredentials: true });

      setCategories(categories.map(category =>
        category._id === categoryId
          ? { ...category, todos: category.todos.filter(todo => todo._id !== todoId) }
          : category
      ));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const renameCategory = async (categoryId, newName) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/todos/category/${categoryId}`,
        { name: newName },
        { withCredentials: true }
      );

      setCategories(categories.map(category =>
        category._id === categoryId ? { ...category, name: response.data.name } : category
      ));
    } catch (error) {
      console.error('Error renaming category:', error);
    }
  };
  

  const toggleComplete = async (categoryId, todoId) => {
    try {
      // Send API request to toggle completion
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/todos/todo/${todoId}/toggle`,
        {},
        { withCredentials: true }
      );
      
      const updatedTodo = response.data;
  
      // Update UI state
      setCategories(categories.map(category => {
        if (category._id === categoryId) {
          return {
            ...category,
            todos: category.todos.map(todo =>
              todo._id === todoId ? updatedTodo : todo
            )
          };
        }
        return category;
      }));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  return (
    <div className="todo-page">
      <h1>To-Do List</h1>
      <button className="add-category-button" onClick={addCategory}>+ Add Category</button>

      <div className="categories">
        {categories.map(category => (
          <TodoCategory
            key={category._id}
            category={category}
            onDeleteCategory={deleteCategory}
            onAddTodo={addTodo}
            onDeleteTodo={deleteTodo}
            onToggleComplete={toggleComplete}
            onRenameCategory={renameCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
