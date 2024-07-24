import sequelize from '../config/database.config';
import User from './user.model';
import Post from './post.model';
import Category from './category.model';
import Comment from './comment.model';
import PostCategory from './postCategory.model';

// Initialize associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.belongsToMany(Category, { through: PostCategory, foreignKey: 'postId' });
Category.belongsToMany(Post, { through: PostCategory, foreignKey: 'categoryId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

async function createTables() {
  try {
    // Dropping tables in reverse order to avoid foreign key constraints issues
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await Comment.drop();
    await PostCategory.drop();
    await Post.drop();
    await Category.drop();
    await User.drop();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    // Syncing tables in the correct order
    await User.sync();
    await Category.sync();
    await Post.sync();
    await PostCategory.sync();
    await Comment.sync();

    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();

export { User, Post, Category, Comment, PostCategory, sequelize };
