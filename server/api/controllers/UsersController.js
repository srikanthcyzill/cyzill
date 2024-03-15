// Users Controller
import User from '../models/UsersModel.js';
import Property from '../models/PropertyModel.js';
import { errorHandler } from '../utils/error.js';

// Update user
export const updateUser = async (req, res, next) => {
    if (req.user._id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// Delete user
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};

// Get listings for a specific user
export const getUserProperties = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const properties = await Property.find({ owner: req.params.id });
            res.status(200).json(properties);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your own properties!'));
    }
};

// Get user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found!'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('email phoneNumber username savedProperties photo');
        const usersWithProperties = await Promise.all(users.map(async user => {
            const properties = await Property.find({ userId: user._id });
            return { ...user._doc, properties: properties.length };
        }));
        res.status(200).json(usersWithProperties);
    } catch (error) {
        next(error);
    }
};

// Add a property to savedProperties
export const addSavedProperty = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const property = await Property.findById(req.body.property_id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        user.savedProperties.push(property._id);
        await user.save();
        res.json({ user: user.toObject() });
    } catch (err) {
        console.error('Error adding saved property:', err);
        res.status(500).json({ message: err.message });
    }
};

// Remove a property from savedProperties
export const removeSavedProperty = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.savedProperties = user.savedProperties.filter(id => id.toString() !== req.body.property_id);
        await user.save();
        res.json({ user: user.toObject() });
    } catch (err) {
        console.error('Error removing saved property:', err);
        res.status(500).json({ message: err.message });
    }
};


// Get all liked properties
export const getLikedProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedProperties');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ savedProperties: user.savedProperties });
    } catch (err) {
        console.error('Error getting liked properties:', err);
        res.status(500).json({ message: err.message });
    }
};