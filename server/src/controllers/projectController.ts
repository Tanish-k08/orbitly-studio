import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';

// PUBLIC: Get published projects only
export const getPublicProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find({ status: 'published' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get single published project by slug
export const getPublicProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug, status: 'published' });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Get all projects (published + draft)
export const getAllProjectsAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Create project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existing = await Project.findOne({ slug: req.body.slug });
    if (existing) {
      res.status(400).json({
        success: false,
        message: 'A project with this slug already exists',
      });
      return;
    }

    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Update project
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (req.body.slug) {
      const existing = await Project.findOne({ slug: req.body.slug, _id: { $ne: id } });
      if (existing) {
        res.status(400).json({
          success: false,
          message: 'A project with this slug already exists',
        });
        return;
      }
    }

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete project
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
