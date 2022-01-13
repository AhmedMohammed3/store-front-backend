import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User, UserStore } from '../models/User';
import { verifyToken } from '../middlewares/token';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const users: User[] = await store.index();
        console.log(users);
        res.status(200).json({
            users: users.map((user) => ({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            })),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const showUser = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.userId);
        const user: User = await store.showUser(id);
        res.status(200).json({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, pass } = req.body;
        const user: User = { firstname, lastname, pass };
        const newUser: User = await store.createUser(user);
        const token: string = jwt.sign(
            { id: newUser.id },
            process.env.JWT_SECRET as string,
        );
        res.status(201).json({
            newUser: {
                id: newUser.id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
            },
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

const user_routes = (app: express.Application): void => {
    // GET /users
    app.get('/users', verifyToken, index);
    // GET /users/:userId
    app.get('/users/:userId', verifyToken, showUser);
    // POST /users/
    app.post('/users', createUser);
};

export default user_routes;
