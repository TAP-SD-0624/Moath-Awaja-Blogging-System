import Post from '../models/post.model';
import Category from '../models/category.model';
import Comment from '../models/comment.model';
import User from '../models/user.model';
import PostCategory from '../models/postCategory.model';

class PostService {
    
    public static async createPost(data: Partial<Post>, userId: number): Promise<Post> {
        return await Post.create({ ...data, userId });
    }

    public static async getPosts(): Promise<Post[]> {
        return await Post.findAll({ include: [User, Category, Comment] });
    }

    public static async getPostById(postId: number): Promise<Post | null> {
        return await Post.findByPk(postId, { include: [User, Category, Comment] });
    }

    public static async updatePost(postId: number, data: any): Promise<[number, Post[]]> {
        return await Post.update(data, {
            where: { id: postId },
            returning: true,
        });
    }

    public static async deletePost(postId: number): Promise<number> {
        return await Post.destroy({
            where: { id: postId },
        });
    }

    public static async addCategoryToPost(postId: number, categoryId: number): Promise<PostCategory> {
        return await PostCategory.create({ postId, categoryId });
    }

    public static async getCategoriesForPost(postId: number): Promise<Category[]> {
        const post = await Post.findByPk(postId, { include: [Category] });
        return post ? post.categories || [] : [];  
    }

    public static async addCommentToPost(postId: number, userId: number, data: Partial<Comment>): Promise<Comment> {
        return await Comment.create({ ...data, postId, userId });
    }
    
    public static async getCommentsForPost(postId: number): Promise<Comment[]> {
        return await Comment.findAll({ where: { postId }, include: [User] });
    }
}

export default PostService;
