import { Response } from 'express';
import { Builder } from 'xml2js';

const builder = new Builder();

export function generateXML(input: any) {
  const xml = builder.buildObject(input);
  console.log(xml);
  return xml;
}

export function generateResponseHeaders(res: Response) {
  res.set({
    'x-amz-version-id': 1,
  });
}