import { Router } from 'express';
import { authenticateJWT, requireAdmin } from '../middleware/authMiddleware';
import { apiWriteLimiter } from '../middleware/rateLimiter';
import { validateBody } from '../middleware/validate';
import {
  projectSchema,
  projectUpdateSchema,
  blogSchema,
  blogUpdateSchema,
} from '../validation/schemas';
import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import {
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';

const router = Router();

// Apply Auth and Admin requirement to all routes in this router
router.use(authenticateJWT);
router.use(requireAdmin);

// Admin Project Routes
router.get('/projects', getAllProjectsAdmin);
router.post('/projects', apiWriteLimiter, validateBody(projectSchema), createProject);
router.put('/projects/:id', apiWriteLimiter, validateBody(projectUpdateSchema), updateProject);
router.delete('/projects/:id', apiWriteLimiter, deleteProject);

// Admin Blog Routes
router.get('/blogs', getAllBlogsAdmin);
router.post('/blogs', apiWriteLimiter, validateBody(blogSchema), createBlog);
router.put('/blogs/:id', apiWriteLimiter, validateBody(blogUpdateSchema), updateBlog);
router.delete('/blogs/:id', apiWriteLimiter, deleteBlog);

export default router;
