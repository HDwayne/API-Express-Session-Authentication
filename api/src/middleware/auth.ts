import { Request, Response, NextFunction } from 'express';
import { isLoggedIn, logOut } from '../auth';
import { BadRequestError, UnauthorizedError } from '../errors';
import { SESSION_ABSOLUTE_TIMEOUT } from '../config';
import { MyContext } from '../types/express-session';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new BadRequestError('You are already logged in!'));
  }
  next();
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new UnauthorizedError('You must be logged in!'));
  }
  next();
}

export const active = async (req: Request, res: Response, next: NextFunction) => { 
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session as MyContext['req']['session'];

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logOut(req, res);
      return next(new UnauthorizedError('Session expired!'));
    }

  }
  next();
}