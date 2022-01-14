import express from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    if (req && req.headers && req.headers.authorization) {
        const authorizationHeader = req.headers.authorization;
        const token: string = authorizationHeader.split(' ')[1];
        const secret: string = process.env.JWT_SECRET as string;
        jwt.verify(token, secret, (err) => {
            if (err) {
                res.status(401).json({
                    message:
                        'You are not authorized to access this resource.(Invalid Token)',
                });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({
            message:
                'You are not authorized to access this resource.(No Auth Header)',
        });
    }
};
