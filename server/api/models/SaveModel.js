import mongoose from 'mongoose';

const saveSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true }
}, { timestamps: true });

saveSchema.index({ user: 1, listing: 1 }, { unique: true });

const Save = mongoose.model('Save', saveSchema);

export default Save;