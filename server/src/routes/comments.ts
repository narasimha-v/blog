import { Router } from 'express';
import { addComment, getComments } from '../controllers';

const router = Router();

router.route('/').post(addComment);
router.route('/:postId').get(getComments);

export { router as commentsRouter };
