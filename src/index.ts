import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import actionHandler from './action.handler';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.all('/:bucket/*', async (req: Request, res: Response) => {
  req.params.key = req.params[0];
  await actionHandler.objectAction(req, res);
});

app.all('/:bucket', async (req: Request, res: Response) => {
  await actionHandler.bucketAction(req, res);
});

app.all('*', async (req: Request, res: Response) => {
  await actionHandler.defaultAction(req, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
