import express from 'express';
import { getAdminPage, updateContent, deleteContent, createContent, login, logout, getContent, createAgent, getAgents, removeAgent } from '../controllers/AdminController.js';
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

export default router;
