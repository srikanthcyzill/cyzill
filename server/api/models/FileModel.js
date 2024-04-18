import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
    filename: String,
    firebaseUrl: String,
}, { timestamps: true });

export default model('File', fileSchema);
