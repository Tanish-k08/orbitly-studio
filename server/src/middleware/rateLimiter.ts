import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 login attempts per 15 mins
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 write requests per 15 mins
  message: {
    success: false,
    message: 'Too many write requests from this IP, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
