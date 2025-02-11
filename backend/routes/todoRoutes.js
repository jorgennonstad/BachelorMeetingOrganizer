const express = require('express');
const router = express.Router();
const { createCategory, getCategories, deleteCategory, addTodo, deleteTodo, toggleTodoComplete, renameCategory } = require('../controllers/todoController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware'); // Import middleware

// 🟢 Public route - Anyone can get the categories
router.get('/categories', authMiddleware, getCategories);

// 🔒 Only logged-in users can create a category
router.post('/category', authMiddleware,roleMiddleware(['admin']), createCategory);

// 🔒 Only Admins can delete a category
router.delete('/category/:id', authMiddleware, roleMiddleware(['admin']), deleteCategory);

// 🔒 Only Admins can rename a category
router.patch('/category/:id', authMiddleware, roleMiddleware(['admin']), renameCategory);

// 🔒 Only logged-in users can add a todo
router.post('/todo', authMiddleware,roleMiddleware(['admin']), addTodo);

// 🔒 Only logged-in users can delete a todo
router.delete('/todo/:id', authMiddleware,roleMiddleware(['admin']), deleteTodo);

// 🔒 Only logged-in users can toggle todo completion
router.patch('/todo/:id/toggle', authMiddleware,roleMiddleware(['admin']), toggleTodoComplete);

module.exports = router;
