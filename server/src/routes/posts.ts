import { Router } from 'express';
import { createPost, deletePost, getPost, getPosts } from '../controllers';
import { validateToken } from '../middleware';

const router = Router();

router.route('/').get(getPosts).post(validateToken, createPost);
router.route('/:id').get(getPost).delete(validateToken, deletePost);

export { router as postsRouter };
