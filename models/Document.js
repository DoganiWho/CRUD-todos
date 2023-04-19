import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    }
})

export default documentSchema;
// module.exports = mongoose.model('Document', documentSchema);
