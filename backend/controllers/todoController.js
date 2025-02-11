const Todo = require('../models/TodoModel');
const Category = require('../models/CategoryModel');

// Create a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name, todos: [] });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all categories with their todos
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('todos');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.deleteMany({ category: id });
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a todo to a category
const addTodo = async (req, res) => {
  try {
    const { text, categoryId } = req.body;
    const todo = new Todo({ text, category: categoryId });
    await todo.save();

    await Category.findByIdAndUpdate(categoryId, { $push: { todos: todo._id } });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Category.findByIdAndUpdate(todo.category, { $pull: { todos: id } });
    await Todo.findByIdAndDelete(id);

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const toggleTodoComplete = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the todo and toggle the completed status
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Rename a category
const renameCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.name = name;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};



module.exports = { createCategory, getCategories, deleteCategory, addTodo, deleteTodo, toggleTodoComplete, renameCategory };
