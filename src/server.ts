import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
    res.send('Hello World!');
});
const PORT: string | undefined = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App running and listening on port ${PORT}!`);
});
