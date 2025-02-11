const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
