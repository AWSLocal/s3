import { Request } from 'express';
import getRawBody from 'raw-body';

export async function getRawBuffer(req: Request) {
  const result = await getRawBody(req, {
    length: req.headers['content-length'],
  });

  return result;
}
