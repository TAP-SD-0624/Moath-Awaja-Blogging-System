import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import AuthService from '../services/auth.service';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (AuthService.isTokenBlacklisted(token)) {
        return res.status(401).json({ error: 'Unauthorized - Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, 'secret') as { id: number };
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        (req as any).user = user;
        next();
    } catch (error ) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default authMiddleware;
