import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.config';
import Post from './post.model';
import Category from './category.model';

class PostCategory extends Model {
    public postId!: number;
    public categoryId!: number;
}

PostCategory.init({
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Post,
            key: 'id',
        },
    },
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Category,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'PostCategory',
});

export default PostCategory;
