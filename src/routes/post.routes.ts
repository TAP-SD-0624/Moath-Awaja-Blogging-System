import { Router } from 'express';
import PostController from '../controllers/post.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validatePost } from '../middlewares/validatePost';

const router = Router();

router.post('/posts', authMiddleware, validatePost, PostController.createPost);
router.put('/posts/:postId', authMiddleware, validatePost, PostController.updatePost);

router.get('/posts', PostController.getPosts);
router.get('/posts/:postId', PostController.getPostById);
router.delete('/posts/:postId', authMiddleware, PostController.deletePost);
router.post('/posts/:postId/categories', authMiddleware, PostController.addCategoryToPost);
router.get('/posts/:postId/categories', PostController.getCategoriesForPost);
router.post('/posts/:postId/comments', authMiddleware, PostController.addCommentToPost);
router.get('/posts/:postId/comments', PostController.getCommentsForPost);

export default router;
