import mongoose from 'mongoose';
import User from '../models/UsersModel.js';

const agentRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const AgentRequest = mongoose.model('AgentRequest', agentRequestSchema);

export default AgentRequest;
