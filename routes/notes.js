const express = require('express');
const router = express.Router();
const Note = require('../models/note');
// const Tag = reqiure('../models/tag')

//All Notes Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {
        const notes = await Note.find(searchOptions).sort('-createdAt') //sorts Notes based on last created
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
    renderNewPage(res, new Note()) 
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
        renderNewPage(res, note, hasError = true);
    }
});


async function renderNewPage(res, note, hasError = false) {
    try {
        // const tags = await Tags.find({})
        const params = {
            // tags : tags,
            note: note
        }
        if (hasError) { params.errorMessage = 'Error Creating Note'}
        res.render('notes/new', params)
    } catch (error) {
        res.redirect('/notes')
    }
} 

module.exports = router;