const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

//All Todos Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const todos = await Todo.find(searchOptions)
        res.render('todos/index.ejs', {
            todos: todos, 
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
})

// New Todo Route
router.get('/new', (req, res) => {
    res.render('todos/new', { todo : new Todo() });
})


// Create Todo Route
router.post('/', async (req, res) => {
    const todo = new Todo({
        name: req.body.name
    })

    try {
        const newTodo = await todo.save()
        // res.redirect(`/todos/${newTodo.id}`)
        res.redirect(`todos`)
    } catch (error) {
         res.render('todos/new', {
            todo: todo, 
            errorMessage: 'Error creating Todo'
        });
    }
});


module.exports = router;