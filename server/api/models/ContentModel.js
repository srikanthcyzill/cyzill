import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    identifier: { type: String, required: true, unique: true },
});


export default mongoose.model('Content', contentSchema);
