import { Router } from 'express';
import { createPost, getPosts } from '../controllers';

const router = Router();

router.route('/').get(getPosts).post(createPost);

export { router as postsRouter };
