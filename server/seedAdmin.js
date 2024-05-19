import mongoose from 'mongoose';
import Admin from './api/models/AdminModel.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
    const admin = new Admin({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin',
    });

    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        await admin.save();
        console.log('Admin account created');
    } catch (err) {
        console.error('Error creating admin account', err);
    } finally {
        mongoose.connection.close();
    }
};

seedAdmin();
