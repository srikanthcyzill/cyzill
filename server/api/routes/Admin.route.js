import express from 'express';
import { getAdminPage, updateContent, deleteContent, createContent, login, logout, getContent, createAgent, getAgents, removeAgent, createContact, getContacts, deleteContact, updateContact, getPage, createPage, updatePage, deletePage, getPages } from '../controllers/AdminController.js';
import { authenticateJWT } from '../middleware/authenticate.js';
import { createPlan, deletePlan, getPlans, updatePlan } from '../controllers/PlanController.js';

const router = express.Router();

router.get('/', authenticateJWT, getAdminPage);
router.post('/content', authenticateJWT, createContent);
router.put('/content/:id', authenticateJWT, updateContent);
router.delete('/content/:id', authenticateJWT, deleteContent);
router.get('/content/:identifier', getContent);
router.post('/login', login);
router.post('/logout', logout);
router.get('/plans', authenticateJWT, getPlans);
router.post('/plans', authenticateJWT, createPlan);
router.put('/plans/:id', authenticateJWT, updatePlan);
router.delete('/plans/:id', authenticateJWT, deletePlan);
router.post('/agent', authenticateJWT, createAgent);
router.get('/agent', getAgents);
router.delete('/agent/:id', authenticateJWT, removeAgent);
router.post('/contact', authenticateJWT, createContact);
router.get('/contact', authenticateJWT, getContacts);
router.delete('/contact/:id', authenticateJWT, deleteContact);
router.patch('/contact/:id', authenticateJWT, updateContact);
router.get('/page/:identifier', authenticateJWT, getPage);
router.get('/pages', getPages);
router.post('/page', authenticateJWT, createPage);
router.put('/page/:id', authenticateJWT, updatePage);
router.delete('/page/:id', authenticateJWT, deletePage);

export default router;
