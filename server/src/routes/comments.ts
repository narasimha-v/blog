import { Router } from 'express';
import { addComment, deleteComment, getComments } from '../controllers';
import { validateToken } from '../middleware';

const router = Router();

router
	.route('/')
	.post(validateToken, addComment)
	.delete(validateToken, deleteComment);
router.route('/:postId').get(getComments);

export { router as commentsRouter };
