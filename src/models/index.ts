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
    console.log('Dropping tables...');
    
    // Dropping tables in reverse order to avoid foreign key constraints issues
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    await Comment.drop().then(() => console.log('Dropped Comments table'));
    await PostCategory.drop().then(() => console.log('Dropped PostCategories table'));
    await Post.drop().then(() => console.log('Dropped Posts table'));
    await Category.drop().then(() => console.log('Dropped Categories table'));
    await User.drop().then(() => console.log('Dropped Users table'));
    
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Syncing tables...');

    // Syncing tables in the correct order
    await User.sync({ force: true }).then(() => console.log('Synced Users table'));
    await Category.sync({ force: true }).then(() => console.log('Synced Categories table'));
    await Post.sync({ force: true }).then(() => console.log('Synced Posts table'));
    await PostCategory.sync({ force: true }).then(() => console.log('Synced PostCategories table'));
    await Comment.sync({ force: true }).then(() => console.log('Synced Comments table'));

    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();

export { User, Post, Category, Comment, PostCategory, sequelize };
