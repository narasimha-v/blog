import { Router } from 'express';
import { createPost, getPost, getPosts } from '../controllers';
import { validateToken } from '../middleware';

const router = Router();

router.route('/').get(getPosts).post(validateToken, createPost);
router.route('/:id').get(getPost);

export { router as postsRouter };
