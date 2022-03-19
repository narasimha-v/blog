import { Router } from 'express';
import { createPost, getPost, getPosts } from '../controllers';

const router = Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPost);

export { router as postsRouter };
