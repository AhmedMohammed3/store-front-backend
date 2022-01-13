import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();

app.use(cors());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

const PORT: string | undefined = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running and listening on port ${PORT}!`);
});
