import Comment from '../models/comment.model';
import User from '../models/user.model';

class CommentService {

    public static async createComment(data: Partial<Comment>, userId: number): Promise<Comment> {
        return await Comment.create({ ...data, userId });
    }
    public static async getComments(): Promise<Comment[]> {
        return await Comment.findAll({include: [User]});
    }

    public static async getCommentById(commentId: number): Promise<Comment | null> {
        return await Comment.findByPk(commentId, {include: [User]});
    }

    public static async updateComment(commentId: number, data: any): Promise<[number, Comment[]]> {
        return await Comment.update(data, {
            where: { id: commentId },
            returning: true,
        });
    }

    public static async deleteComment(commentId: number): Promise<number> {
        return await Comment.destroy({
            where: { id: commentId },
        });
    }
}

export default CommentService;
