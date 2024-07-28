// routes/user.routes.ts
import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validateUser } from '../middlewares/validateUser';
import authMiddleware from '../middlewares/auth.middleware';
import checkRole from '../middlewares/role.middleware';

const router = Router();

// Routes for User
router.post('/', validateUser, checkRole('admin'), UserController.createUserController);
router.get('/', authMiddleware, checkRole('admin'), UserController.getUsersController);
router.get('/:id', authMiddleware, checkRole('admin'), UserController.getUserByIdController);
router.put('/:id', authMiddleware, checkRole('admin'), UserController.updateUserController);
router.delete('/:id', authMiddleware, checkRole('admin'), UserController.deleteUserController);

// Routes for User by email or username
router.get('/email/:email', authMiddleware, (req, res) => UserController.getUserByNameOrEmailController(req, res, 'email'));
router.get('/username/:username', authMiddleware, (req, res) => UserController.getUserByNameOrEmailController(req, res, 'username'));


export default router;
