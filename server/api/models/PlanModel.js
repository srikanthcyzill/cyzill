// PlanModel.js

import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    name: { type: String },
    days: { type: String },
    support: { type: String },
    listing: { type: String },
    emailSupport: { type: Boolean },
    inquiry: { type: String },
    price: { type: String },
});

export default mongoose.model('Plan', planSchema);
