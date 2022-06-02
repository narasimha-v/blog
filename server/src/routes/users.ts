import { Router } from 'express';
import { loginUser, registerUser, userInfo } from '../controllers';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/userInfo/:id').get(userInfo);

export { router as usersRouter };
