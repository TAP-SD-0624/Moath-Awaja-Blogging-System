import CategoryService from '../../src/services/category.service';
import Category from '../../src/models/category.model';

jest.mock('../../src/models/category.model', () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };
});

describe('CategoryService', () => {
  it('should create a new category', async () => {
    const category = {
      id: 1,
      name: 'Test Category',
    };

    (Category.create as jest.Mock).mockResolvedValue(category);

    const result = await CategoryService.createCategory(category);
    expect(result).toEqual(category);
  });

  it('should get all categories', async () => {
    const categories = [
      {
        id: 1,
        name: 'Test Category',
      },
    ];

    (Category.findAll as jest.Mock).mockResolvedValue(categories);

    const result = await CategoryService.getCategories();
    expect(result).toEqual(categories);
  });

  it('should get a category by id', async () => {
    const category = {
      id: 1,
      name: 'Test Category',
    };

    (Category.findByPk as jest.Mock).mockResolvedValue(category);

    const result = await CategoryService.getCategoryById(1);
    expect(result).toEqual(category);
  });

  it('should update a category', async () => {
    const category = {
      id: 1,
      name: 'Test Category',
    };

    const updatedCategory = {
      ...category,
      name: 'Updated Category',
    };

    (Category.update as jest.Mock).mockResolvedValue([1, [updatedCategory]]);

    const result = await CategoryService.updateCategory(1, { name: 'Updated Category' });
    expect(result).toEqual([1, [updatedCategory]]);
  });

  it('should delete a category', async () => {
    (Category.destroy as jest.Mock).mockResolvedValue(1);

    const result = await CategoryService.deleteCategory(1);
    expect(result).toEqual(1);
  });
});
