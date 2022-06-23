import { Request, Response } from 'express';
import { pick } from 'lodash';
import { getRawBuffer } from './helpers/request.helper';

async function handle(req: Request, res: Response) {

  const buffer = await getRawBuffer(req);
  console.log(buffer);

  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'body',
    ]),
  });

  res.status(200).send("OK");
}

export default {
  handle,
};