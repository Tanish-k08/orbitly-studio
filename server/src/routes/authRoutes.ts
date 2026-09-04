import { Router } from 'express';
import { login, getMe } from '../controllers/authController';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../validation/schemas';
import { authLimiter } from '../middleware/rateLimiter';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', authLimiter, validateBody(loginSchema), login);
router.get('/me', authenticateJWT, getMe);

export default router;
