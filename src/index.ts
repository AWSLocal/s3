import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import actionHandler from './action.handler';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded());

app.all('*', async (req: Request, res: Response) => {
  await actionHandler.handle(req, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
