const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const Note = require('../models/note');

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).sort('-createdAt')
    const notes = await Note.find({}).sort('-createdAt')
    res.render('index', {
        todos: todos,
        notes: notes
    });
})


module.exports = router;