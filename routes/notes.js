const express = require('express');
const router = express.Router();
const Note = require('../models/note');
// const Tag = reqiure('../models/tag')

//All Notes Route
router.get('/', async (req, res) => {
    // res.send('All Notes');
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {
        const notes = await Note.find(searchOptions)
        res.render('notes/index.ejs', {
            notes: notes, 
            searchOptions: req.query
        });
    } catch (error) {
        res.redirect('/')
    }
})

// New Note Route
router.get('/new', async (req, res) => {

    try {
        // const tags = await Tags.find({})
        const note = new Note()
        res.render('notes/new', {
            // tags : tags,
            note: note
        })
    } catch (error) {
        res.redirect('/notes')
    }
    // res.render('notes/new', { note : new Note() });
})


// Create Note Route
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title, 
        tags: req.body.tags, 
        description: req.body.description
    })
    try {
        const newNote = await note.save()
        // res.redirect(`/notes/${newNote.id}`)
        res.redirect(`notes`)
    } catch (error) {
         res.render('notes/new', {
            note: note, 
            errorMessage: 'Error creating Note'
        });
    }
});


module.exports = router;