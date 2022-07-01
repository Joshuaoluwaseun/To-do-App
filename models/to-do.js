const Joi = require('joi');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60
    }},
    {timestamps: true}
))

function validateTodo(todo) {
    const schema = {
        title: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(3).max(20).required(),
    }

    return Joi.validate(todo, schema);
}


exports.Todo = Todo;
exports.validate = validateTodo ;