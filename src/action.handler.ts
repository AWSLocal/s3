import { Request, Response } from 'express';
import { has, pick } from 'lodash';
import xml2js from 'xml2js';
import { Method } from './enums';
import { getRawBuffer } from './helpers/request.helper';
import { generateResponseHeaders, generateXML } from './helpers/response.helper';
import { S3 } from './services/s3.service';

const s3 = new S3();

async function objectAction(req: Request, res: Response) {
  const { bucket, key } = req.params;

  const buffer = await getRawBuffer(req);

  console.log(buffer.length);
  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'query',
      'body',
    ]),
  });

  let result;
  if (req.method === 'PUT') {
    if (has(req.headers, 'x-amz-copy-source')) {
      result = await s3.object.copy(bucket, key, req.headers['x-amz-copy-source'] as string);
    } else {
      result = await s3.object.put(bucket, key, buffer);
    }
  } else if (req.method === 'DELETE') {
    await s3.object.delete(bucket, key);
  }

  generateResponseHeaders(res);

  res.status(200).send(generateXML(result));
}

async function bucketAction(req: Request, res: Response) {
  const { bucket } = req.params;

  let result;
  if (req.method === Method.PUT) {
    await s3.bucket.create(bucket);
    res.setHeader('Location', `/${bucket}`);
  } else if (req.method === Method.DELETE) {
    await s3.bucket.delete(bucket);
  } else if (req.method === Method.POST) {
    const buffer = await getRawBuffer(req);
    const parsed = await xml2js.parseStringPromise(buffer.toString());
    result = await s3.object.deleteMany(bucket, parsed);
  }

  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'body',
      'query',
    ]),
  });

  res.status(200).send(generateXML(result));
}

async function defaultAction(req: Request, res: Response) {

  console.log({
    ...pick(req, [
      'method',
      'headers',
      'params',
      'query',
      'body',
    ]),
  });

  res.status(200).send('OK');
}

export default {
  objectAction,
  defaultAction,
  bucketAction,
};