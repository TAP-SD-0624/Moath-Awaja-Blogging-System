import { Router } from 'express';
import CommentController from '../controllers/comment.controller';
import authMiddleware from '../middlewares/auth.middleware';


const router = Router();

router.post('/', authMiddleware,CommentController.createComment);
router.get('/', authMiddleware, CommentController.getComments);
router.get('/:commentId',authMiddleware, CommentController.getCommentById);
router.put('/:commentId', authMiddleware,CommentController.updateComment);
router.delete('/:commentId',authMiddleware, CommentController.deleteComment);

export default router;
