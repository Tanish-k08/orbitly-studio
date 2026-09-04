import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const rawEmail = req.body.email;
    const rawPassword = req.body.password;

    if (!rawEmail || !rawPassword) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    const email = String(rawEmail).toLowerCase().trim();
    const password = String(rawPassword);

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`[Auth Debug] Login attempt failed: No user found with email "${email}"`);
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error(`[Auth Debug] Login attempt failed: Password mismatch for user "${email}"`);
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'orbitly_studio_super_secret_jwt_key_2026_change_in_prod';
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    console.log(`[Auth Debug] Login successful for user "${email}" (role: ${user.role})`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
