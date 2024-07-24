import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const router = Router();

router.post('/', CategoryController.createCategoryController);
router.get('/', CategoryController.getCategoriesController);
router.get('/:categoryId', CategoryController.getCategoryByIdController);
router.put('/:categoryId', CategoryController.updateCategoryController);
router.delete('/:categoryId', CategoryController.deleteCategoryController);

export default router;
