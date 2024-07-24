import { Router } from 'express';
import PostController from '../controllers/post.controller';
import  authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/',authMiddleware, PostController.createPost);
router.get('/',authMiddleware, PostController.getPosts);
router.get('/:postId',authMiddleware, PostController.getPostById);
router.put('/:postId',authMiddleware, PostController.updatePost);
router.delete('/:postId',authMiddleware, PostController.deletePost);
router.post('/:postId/categories',authMiddleware, PostController.addCategoryToPost);
router.get('/:postId/categories',authMiddleware, PostController.getCategoriesForPost);
router.post('/:postId/comments', authMiddleware,PostController.addCommentToPost);
router.get('/:postId/comments',authMiddleware, PostController.getCommentsForPost);

export default router;
