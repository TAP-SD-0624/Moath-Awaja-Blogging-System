import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/validateUser';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Routes for User
router.post('/users', validateUser, UserController.createUserController);
router.get('/users', authMiddleware, UserController.getUsersController);
router.get('/users/:id', authMiddleware, UserController.getUserByIdController);
router.put('/users/:id', authMiddleware, UserController.updateUserController);
router.delete('/users/:id', authMiddleware, UserController.deleteUserController);

// Routes for User by email or username
router.get('/users/email/:email', authMiddleware, (req, res) => UserController.getUserByNameOrEmailController(req, res, 'email'));
router.get('/users/username/:username', authMiddleware, (req, res) => UserController.getUserByNameOrEmailController(req, res, 'username'));

export default router;
