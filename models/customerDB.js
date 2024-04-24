// models/todo.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    Name: String,
    Age: Number,
})

// models/todo.js
const customerDB = mongoose.model('customer', customerSchema)

module.exports = customerDB


