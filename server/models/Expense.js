const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  item: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  group: String,
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
