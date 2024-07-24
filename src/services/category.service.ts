import Category from '../models/category.model';


class CategoryService {

    public static async createCategory(data: Partial<Category>): Promise<Category> {
        return await Category.create(data);
    }

    public static async getCategories(): Promise<Category[]> {
        return await Category.findAll();
    }

    public static async getCategoryById(categoryId: number): Promise<Category | null> {
        return await Category.findByPk(categoryId);
    }

    public static async updateCategory(categoryId: number, data: any): Promise<[number, Category[]]> {
        return await Category.update(data, {
            where: { id: categoryId },
            returning: true,
        });
    }

    public static async deleteCategory(categoryId: number): Promise<number> {
        return await Category.destroy({
            where: { id: categoryId },
        });
    }
}

export default CategoryService;
