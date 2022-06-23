import { Request, Response } from "express";

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app('*', (req: Request, res: Response) => {
  console.log({
    method: req.method,
    headers: req.headers,
  })
  res.send(200);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
