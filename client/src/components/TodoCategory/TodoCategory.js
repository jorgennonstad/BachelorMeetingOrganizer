import React, { useState } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import './TodoCategory.css';

const TodoCategory = ({ category, onDeleteCategory, onAddTodo, onDeleteTodo, onToggleComplete, onRenameCategory }) => {
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(category.name);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(category._id, newTodo);
      setNewTodo('');
    }
  };

  const handleDeleteCategory = () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      onDeleteCategory(category._id);
    }
  };

  const handleDeleteTodo = (todoId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTodo(category._id, todoId);
    }
  };

  const handleRenameCategory = () => {
    if (editedName.trim() && editedName !== category.name) {
      onRenameCategory(category._id, editedName);
    }
    setIsEditing(false);
  };

  const isCategoryCompleted = category.todos.length > 0 && category.todos.every(todo => todo.completed);

  return (
    <div className={`todo-category ${isCategoryCompleted ? 'completed-category' : ''}`}>
      <div className="category-header">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleRenameCategory}
            onKeyDown={(e) => e.key === 'Enter' && handleRenameCategory()}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditing(true)}>{category.name}</h2>
        )}
        <FaTrash className="delete-icon" onClick={handleDeleteCategory} />
      </div>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}><FaPlus /></button>
      </div>

      <ul className="todo-list">
        {category.todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <div className="checkbox-wrapper-19">
              <input
                type="checkbox"
                id={`cb-${todo._id}`}
                checked={todo.completed}
                onChange={() => onToggleComplete(category._id, todo._id)}
              />
              <label htmlFor={`cb-${todo._id}`} className={`check-box ${todo.completed ? 'checked' : ''}`} />
            </div>
            <span className={todo.completed ? 'completed-task' : ''}>{todo.text}</span>
            <FaTrash className="delete-icon" onClick={() => handleDeleteTodo(todo._id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCategory;
