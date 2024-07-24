import { Router } from 'express';
import CommentController from '../controllers/comment.controller';
import authMiddleware from '../middlewares/auth.middleware';


const router = Router();

router.post('/', authMiddleware,CommentController.createComment);
router.get('/', CommentController.getComments);
router.get('/:commentId', CommentController.getCommentById);
router.put('/:commentId', CommentController.updateComment);
router.delete('/:commentId', CommentController.deleteComment);

export default router;
