const mongoose = require("mongoose");

const todoModelSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

const Todos = mongoose.model('Todos', todoModelSchema);

module.exports = Todos;