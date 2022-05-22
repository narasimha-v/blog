import { Router } from 'express';
import { likePost } from '../controllers';
import { validateToken } from '../middleware';

const router = Router();

router.route('/').post(validateToken, likePost);

export { router as likesRouter };
