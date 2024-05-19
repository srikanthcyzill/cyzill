import Admin from '../models/AdminModel.js';
import Content from '../models/ContentModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';
import Agent from '../models/AgentModel.js';
import Contact from '../models/ContactModel.js';
import Page from '../models/PageModel.js';
import File from '../models/FileModel.js';
import AgentRequest from '../models/AgentRequestModel.js';

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

export const updateAgentStatus = async (req, res) => {
    try {
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!updatedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.json(updatedAgent);
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
// Route for admins to get all transactions
export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Route for admins to get a specific transaction
export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Route for admins to create a new transaction
export const createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.json(savedTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Route for admins to update a transaction
export const updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(updatedTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Route for admins to delete a transaction
export const deleteTransaction = async (req, res) => {
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(deletedTransaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return next(errorHandler(404, 'Admin not found'));
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return next(errorHandler(401, 'Wrong Credentials'));
        }
        const token = jwt.sign({ _id: admin._id, roles: admin.roles }, process.env.JWT_SECRET);
        const { password: pwd, ...rest } = admin._doc;
        res.status(200).json({ token, ...rest });
    } catch (error) {
        next(error);
    }
};

// Logout
export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all admins
export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create an admin
export const createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin({ ...req.body, roles: [req.body.role] }); // Save the role as an array
        const savedAdmin = await newAdmin.save();
        res.json(savedAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update an existing admin
export const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(updatedAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(deletedAdmin);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Add a new file
export const addFile = async (req, res) => {
    const { filename, firebaseUrl } = req.body;
    const newFile = new File({
        filename,
        firebaseUrl
    });

    try {
        const savedFile = await newFile.save();
        res.status(201).json(savedFile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing file
export const updateFile = async (req, res) => {
    const { filename, firebaseUrl } = req.body;

    try {
        const updatedFile = await File.findByIdAndUpdate(req.params.id, { filename, firebaseUrl }, { new: true });
        if (!updatedFile) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json(updatedFile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a file
export const deleteFile = async (req, res) => {
    try {
        const deletedFile = await File.findByIdAndDelete(req.params.id);
        if (!deletedFile) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json(deletedFile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all files
export const getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific file
export const getFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }
        res.json(file);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const createAgentRequest = async (req, res) => {
    try {
        const newAgentRequest = new AgentRequest({ ...req.body, user: req.user.id });
        const savedAgentRequest = await newAgentRequest.save();
        res.json(savedAgentRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAgentRequests = async (req, res) => {
    try {
        const agentRequests = await AgentRequest.find().populate('user');
        res.json(agentRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteAgentRequest = async (req, res) => {
    try {
        const deletedAgentRequest = await AgentRequest.findByIdAndDelete(req.params.id);
        if (!deletedAgentRequest) {
            return res.status(404).json({ message: 'Agent request not found' });
        }
        res.json(deletedAgentRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const updateAgentRequest = async (req, res) => {
    try {
        const updatedAgentRequest = await AgentRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAgentRequest) {
            return res.status(404).json({ message: 'Agent request not found' });
        }
        res.json(updatedAgentRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

