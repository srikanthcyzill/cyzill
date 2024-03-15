import express from 'express';
import { deleteUser, updateUser, getUserProperties, getUser, addSavedProperty, removeSavedProperty, getLikedProperties, getAllUsers } from '../controllers/UsersController.js';
import { authenticateJWT } from '../middleware/authenticate.js';

const router = express.Router();

router.put('/update/:id', authenticateJWT, updateUser);
router.delete('/delete/:id', authenticateJWT, deleteUser)
router.get('/properties/:id', authenticateJWT, getUserProperties)
router.get('/', authenticateJWT, getAllUsers);
router.put('/:id/savedProperties', authenticateJWT, addSavedProperty);
router.delete('/:id/savedProperties', authenticateJWT, removeSavedProperty);
router.get('/:id/savedProperties', authenticateJWT, getLikedProperties);

export default router;
