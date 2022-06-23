import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import multer from 'multer';
import actionHandler from './action.handler';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.all('*', upload.any(), async (req: Request, res: Response) => {
  await actionHandler.handle(req, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
