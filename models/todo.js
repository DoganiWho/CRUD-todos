const mongoose = require('mongoose');
//const Note = require('./note');

const todoSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now,
    },
})


/* Check if Todo has notes associated with it
//  todoSchema.pre('remove', function(next) {
//     Note.find({ todo : this.id }, (err, notes) => {
//         if (err) {
//             next(err);
//         } else if (notes.length > 0) {
//             next(new Error('This todo still has notes associated with it'));
//         } else {
//             next();
//         }
//     });
// });
*/
module.exports = mongoose.model("Todo", todoSchema);