
const Expense = require('../models/Expense.js');
let expenses = require('./expenses.json');


expenses.forEach((e) => {
  const e1 = new Expense(e);
  e1.save();
});
