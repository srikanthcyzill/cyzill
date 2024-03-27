import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'unsolved',
    },
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
