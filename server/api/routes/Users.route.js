import express from 'express';
import { deleteUser, updateUser, getUserListings, getUser } from '../controllers/UsersController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/properties/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;
