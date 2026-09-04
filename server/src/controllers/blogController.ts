import { Request, Response, NextFunction } from 'express';
import { Blog } from '../models/Blog';

// PUBLIC: Get published blogs only (featured first, then newest)
export const getPublicBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ featured: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// PUBLIC: Get single published blog by slug
export const getPublicBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, status: 'published' });

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Get all blogs (published + draft)
export const getAllBlogsAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Create blog
export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existing = await Blog.findOne({ slug: req.body.slug });
    if (existing) {
      res.status(400).json({
        success: false,
        message: 'A blog post with this slug already exists',
      });
      return;
    }

    const blog = await Blog.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Update blog
export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.body.slug) {
      const existing = await Blog.findOne({ slug: req.body.slug, _id: { $ne: id } });
      if (existing) {
        res.status(400).json({
          success: false,
          message: 'A blog post with this slug already exists',
        });
        return;
      }
    }

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// ADMIN: Delete blog
export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
