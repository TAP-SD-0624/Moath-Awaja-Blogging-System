import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.config';
import User from './user.model';
import Category from './category.model';
import PostCategory from './postCategory.model';

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public userId!: number;
    public readonly categories?: Category[]; // Add this line to define the categories association
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
});

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });

Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'postId' });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'categoryId' });

export default Post;
