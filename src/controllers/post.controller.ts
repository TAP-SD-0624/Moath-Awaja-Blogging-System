import { Request, Response } from 'express';
import PostService from '../services/post.service';

interface CustomRequest extends Request {
    user?: any;
}



class PostController {
    public static async createPost(req: CustomRequest, res: Response): Promise<Response> {
        try {
            const post = await PostService.createPost(req.body, req.user.id);
            return res.status(201).json(post);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async getPosts(req: Request, res: Response): Promise<Response> {
        try {
            const posts = await PostService.getPosts();
            return res.status(200).json(posts);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async getPostById(req: Request, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const post = await PostService.getPostById(postId);
            if (post) {
                return res.status(200).json(post);
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async updatePost(req: Request, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const [numberOfAffectedRows, updatedPosts] = await PostService.updatePost(postId, req.body);
            if (numberOfAffectedRows > 0) {
                return res.status(200).json(updatedPosts[0]);
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async deletePost(req: Request, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const deleted = await PostService.deletePost(postId);
            if (deleted) {
                return res.status(204).json();
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async addCategoryToPost(req: Request, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const category = await PostService.addCategoryToPost(postId, req.body.categoryId);
            return res.status(201).json(category);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async getCategoriesForPost(req: Request, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const categories = await PostService.getCategoriesForPost(postId);
            return res.status(200).json(categories);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async addCommentToPost(req: CustomRequest, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const userId = req.user.id;
            const commentData = { ...req.body, userId, postId };
            
            const comment = await PostService.addCommentToPost(postId, userId, commentData);
            
            return res.status(201).json(comment);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async getCommentsForPost(req: Request, res: Response): Promise<Response> {
        try {
            const postId = parseInt(req.params.postId, 10);
            const comments = await PostService.getCommentsForPost(postId);
            return res.status(200).json(comments);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default PostController