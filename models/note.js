const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    // tags: {
    //     type: Array[String],
    // },
    description: {
        type: String, 
    }, 
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now,
    },
})

module.exports = mongoose.model("Note", noteSchema);