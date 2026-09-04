import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import blogRoutes from './routes/blogRoutes';
import adminRoutes from './routes/adminRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Orbitly Studio API Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin', adminRoutes);

// Centralized Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`[Orbitly Server] Running on port ${PORT}`);
  console.log(`[Orbitly Server] Health check: http://localhost:${PORT}/api/health`);
});

export default app;
