import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    days: { type: String, required: true },
    support: { type: String, required: true },
    listing: { type: String, required: true },
    emailSupport: { type: Boolean, required: true },
    inquiry: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
});

export default mongoose.model('Plan', planSchema);