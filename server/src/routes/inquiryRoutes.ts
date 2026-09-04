import { Router } from 'express';
import { createInquiry } from '../controllers/inquiryController';
import { validateBody } from '../middleware/validate';
import { inquirySchema } from '../validation/schemas';
import { apiWriteLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', apiWriteLimiter, validateBody(inquirySchema), createInquiry);

export default router;
