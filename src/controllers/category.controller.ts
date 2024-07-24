import { Request, Response } from 'express';
import CategoryService from '../services/category.service';

class CategoryController {

    // Controller to create a category
    public static async createCategoryController(req: Request, res: Response) {
        try {
            const category = await CategoryService.createCategory(req.body);
            return res.status(201).json(category);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    // Controller to get all categories
    public static async getCategoriesController(req: Request, res: Response) {
        try {
            const categories = await CategoryService.getCategories();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
    
    // Controller to get a category by Id
    public static async getCategoryByIdController(req: Request, res: Response) {
        try {
            const category = await CategoryService.getCategoryById(Number(req.params.id));
            if (category) {
                return res.status(200).json(category);
            }
            return res.status(404).json({ error: 'Category not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
    
    // Controller to update a category
    public static async updateCategoryController(req: Request, res: Response) {
        try {
            const category = await CategoryService.updateCategory(Number(req.params.id), req.body);
            if (category) {
                return res.status(200).json(category);
            }
            return res.status(404).json({ error: 'Category not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }

    // Controller to delete a category
    public static async deleteCategoryController(req: Request, res: Response) {
        try {
            const deleted = await CategoryService.deleteCategory(Number(req.params.id));
            if (deleted) {
                return res.status(204).send();
            }
            return res.status(404).json({ error: 'Category not found' });
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default CategoryController;