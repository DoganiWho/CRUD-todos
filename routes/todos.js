const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const Note = require('../models/note');

//All Todos Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const todos = await Todo.find(searchOptions).sort('-createdAt') //sorts Todos based on last created
        res.render('todos/index.ejs', {
            todos: todos, 
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
});

// New Todo Route
router.get('/new', (req, res) => {
    res.render('todos/new', { todo : new Todo() });
});


// Create Todo Route
router.post('/', async (req, res) => {
    const todo = new Todo({
        name: req.body.name
    })

    try {
        const newTodo = await todo.save()
        res.redirect(`/todos/${newTodo.id}`)
    } catch (error) {
         res.render('todos/new', {
            todo: todo, 
            errorMessage: 'Error creating Todo'
        });
    }
});

// view Todo
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        const notes = await Note.find({ todo: todo.id }).limit(10).exec()
        res.render('todos/show', {
            todo: todo, 
            associatedNotes: notes
        })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// edit Todo
router.get('/:id/edit', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.render('todos/edit', { todo : todo });
    } catch (error) {
        res.redirect('/todos')
    }
});

// update Todo
router.put('/:id', async (req, res) => {
    let todo;
    try {
        todo = await Todo.findById(req.params.id)
        todo.name = req.body.name
        await todo.save()
        res.redirect(`/todos/${todo.id}`)
    } catch {
        if (todo == null) {
            res.redirect('/');
        } else {
            res.render('todos/edit', {
                todo: todo, 
                errorMessage: 'Error updating Todo'
            });
        }
    }
});

// delete Todo
router.delete('/:id', async (req, res) => {
    let todo;
    try {
        todo = await Todo.findById(req.params.id)
        await todo.deleteOne()
        res.redirect('/todos')
    } catch (error) {
        if (todo == null) {
            res.redirect('/');
        } else {
            res.redirect(`/todos/${todo.id}`)
        }
        console.log(error);
    }
});


module.exports = router;