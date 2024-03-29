import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRouter from './api/routes/user.route.js';
import authRouter from './api/routes/auth.router.js';
import propertyRouter from './api/routes/property.route.js';

dotenv.config();

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/property', propertyRouter);

app.get("/api", function (req, res) {
    res.json({ message: "Cyzill api" });
});
app.get("/", function (req, res) {
    res.json({ message: "Cyzill Server Started" });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    let errorDetails = {};
    if (process.env.NODE_ENV === 'development') {
        errorDetails.stack = err.stack;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...errorDetails,
    });
});
