import { Request, Response } from 'express';
import { pick } from 'lodash';

function handle(req: Request, res: Response) {
  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'body',
    ]),
  });

  res.status(200);
}

export default {
  handle,
};