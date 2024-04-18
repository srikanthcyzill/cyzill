import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    transactionId: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default model('Transaction', TransactionSchema);
