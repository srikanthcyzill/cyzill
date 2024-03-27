import Admin from '../models/AdminModel.js';
import Content from '../models/ContentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import Agent from '../models/AgentModel.js';
import Contact from '../models/ContactModel.js';
import Page from '../models/PageModel.js';


export const getAdminPage = async (req, res) => {
    try {
        const content = await Content.find();
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createContent = async (req, res) => {
    try {
        const newContent = new Content(req.body);
        const savedContent = await newContent.save();
        res.json(savedContent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateContent = async (req, res) => {
    try {
        const updatedContent = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(updatedContent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteContent = async (req, res) => {
    try {
        const deletedContent = await Content.findByIdAndDelete(req.params.id);
        if (!deletedContent) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(deletedContent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getContent = async (req, res) => {
    try {
        const content = await Content.findOne({ identifier: req.params.identifier });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPage = async (req, res) => {
    try {
        const page = await Page.findOne({ identifier: req.params.identifier });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPages = async (req, res) => {
    try {
        const pages = await Page.find();
        res.json(pages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const createPage = async (req, res) => {
    try {
        const newPage = new Page(req.body);
        const savedPage = await newPage.save();
        res.json(savedPage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePage = async (req, res) => {
    try {
        const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPage) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(updatedPage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePage = async (req, res) => {
    try {
        const deletedPage = await Page.findByIdAndDelete(req.params.id);
        if (!deletedPage) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.json(deletedPage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createAgent = async (req, res) => {
    try {
        const newAgent = new Agent(req.body);
        const savedAgent = await newAgent.save();
        res.json(savedAgent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const removeAgent = async (req, res) => {
    try {
        const removedAgent = await Agent.findByIdAndDelete(req.params.id);
        if (!removedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json(removedAgent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.json(savedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(deletedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return next(errorHandler(404, 'Admin not found'));
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return next(errorHandler(401, 'Wrong Credentials'));
        }
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
        const { password: pwd, ...rest } = admin._doc;
        res.status(200).json({ token, ...rest });
    } catch (error) {
        next(error);
    }
};


export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
