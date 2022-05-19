const express = require('express');
const mongoose = require('mongoose');
const api = require('./server/routes/api.js');

mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', api);

const PORT = 3000;
app.listen(PORT, console.log(`listening on ${PORT}`));
