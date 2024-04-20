import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
    agentName: { type: String, required: true },
    agencyName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    officeAddress: { type: String, required: true },
    pincode: { type: String, required: true },
    serviceArea: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    photo: { type: [String], default: [] },
    officePhotos: { type: [String], default: [] }
});

export default mongoose.model('Agent', agentSchema);
