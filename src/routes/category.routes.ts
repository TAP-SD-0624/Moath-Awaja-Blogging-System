import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import authMiddleware from '../middlewares/auth.middleware';
import checkRole from '../middlewares/role.middleware';
import { validateCategory } from '../middlewares/validateCategory';
const router = Router();

router.post('/', authMiddleware, checkRole("admin"), validateCategory, CategoryController.createCategoryController);
router.get('/', authMiddleware, checkRole("admin"), CategoryController.getCategoriesController);
router.get('/:categoryId', authMiddleware, checkRole("admin"), CategoryController.getCategoryByIdController);
router.put('/:categoryId', authMiddleware, checkRole("admin"), validateCategory, CategoryController.updateCategoryController);
router.delete('/:categoryId', authMiddleware, checkRole("admin"), CategoryController.deleteCategoryController);

export default router;
