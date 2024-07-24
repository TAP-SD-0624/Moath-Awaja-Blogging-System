import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.config';
import User from './user.model';
import Post from './post.model';

class Comment extends Model {
    public id!: number;
    public content!: string;
    public userId!: number;
    public postId!: number;
}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Comment',
});

export default Comment;
