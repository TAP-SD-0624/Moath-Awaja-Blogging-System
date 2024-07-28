import { Request, Response, NextFunction } from 'express';

const checkRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (user.role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        next();
    };
};

export default checkRole;
