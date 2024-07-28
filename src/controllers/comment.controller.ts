import { Request, Response } from 'express';
import CommentService from '../services/comment.service';

interface CustomRequest extends Request {
    user?: { id: number; role: string };
}


class CommentController {
    public static async createComment(req: CustomRequest, res: Response): Promise<Response> {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const comment = await CommentService.createComment(req.body, req.user.id);
            return res.status(201).json(comment);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async getComments(req: Request, res: Response): Promise<Response> {
        try {
            const comments = await CommentService.getComments();
            return res.status(200).json(comments);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async getCommentById(req: Request, res: Response): Promise<Response> {
        try {
            const commentId = parseInt(req.params.commentId, 10);
            const comment = await CommentService.getCommentById(commentId);
            if (comment) {
                return res.status(200).json(comment);
            } else {
                return res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async updateComment(req: Request, res: Response): Promise<Response> {
        try {
            const commentId = parseInt(req.params.commentId, 10);
            const [numberOfAffectedRows, updatedComments] = await CommentService.updateComment(commentId, req.body);
            if (numberOfAffectedRows > 0) {
                return res.status(200).json(updatedComments[0]);
            } else {
                return res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public static async deleteComment(req: Request, res: Response): Promise<Response> {
        try {
            const commentId = parseInt(req.params.commentId, 10);
            const deleted = await CommentService.deleteComment(commentId);
            if (deleted) {
                return res.status(204).json();
            } else {
                return res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default CommentController;
