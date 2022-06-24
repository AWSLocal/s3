import { Request, Response } from 'express';
import { has, pick } from 'lodash';
import { getRawBuffer } from './helpers/request.helper';
import { generateResponseHeaders, generateXML } from './helpers/response.helper';
import { S3 } from './services/s3.service';

const s3 = new S3();

async function handlePut(req: Request, res: Response) {

  const buffer = await getRawBuffer(req);
  console.log(buffer.length);
  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'body',
    ]),
  });

  let result;
  if (has(req.headers, 'x-amz-copy-source')) {
    result = s3.copyObject();
  } else {
    result = s3.putObject(req, buffer);
  }

  generateResponseHeaders(res);

  res.status(200).send(generateXML(result));
}

async function handleDefault(req: Request, res: Response) {

  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'body',
    ]),
  });

  res.status(200).send('OK');
}

export default {
  handlePut,
  handleDefault,
};