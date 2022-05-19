const express = require('express');
const moment = require('moment');
const router = express.Router();
const Expense = require('../models/Expense.js');

router.get('/expenses', (req, res) => {
  Expense.find({})
    .sort({ date: -1 })
    .exec(function (err, expenses) {
      if (err) {
        res.sendStatus(400);
      } else res.status(200).send(expenses);
    });
});

router.post('/expense', (req, res) => {
  let expense = req.body;
  expense.data = moment().format('MMMM Do YYYY, h:mm:ss a');

  if (expense) {
    let e2 = new Expense(expense);
    e2.save().then(function (expense) {
      console.log(`The amount is: ${expense.amount}, For ${expense.item}`);
    });
    res.status(201).send(expense);
  } else res.sendStatus(400);
});

router.put('/update', (req, res) => {
  let groupsName = req.body;

  if (groupsName) {
    Expense.findOneAndUpdate(
      { group: groupsName.group1 },
      { group: groupsName.group2 },
      { new: true }
    ).then(function (expense) {
      res.send(
        `${expense.item} has changed by group: new group is: ${expense.group} `
      );
    });
  } else res.sendStatus(404);
});

router.get('/expenses/query', (req, res) => {
  let groupParam = req.query.group;
  let total = req.query.total;

  if (total === 'true') {
    Expense.aggregate([
      {
        $group: {
          _id: '$group',
          totalAmount: { $sum: '$amount' },
        },
      },
      { $match: { _id: `${groupParam}` } },
    ]).exec(function (err, total) {
      res.status(200).send(total);
    });
  } else {
    res.sendStatus(400);
  }
});

router.get('/expenses/:group', (req, res) => {
  let groupParam = req.params.group;

  Expense.find({ group: groupParam }).exec(function (err, expenses) {
    res.send(expenses);
  });
});

module.exports = router;
