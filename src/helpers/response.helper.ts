import { Response } from 'express';
import { create } from 'xmlbuilder2';

export function generateXML(input: any) {
  const xml = create({ root: input }).end({ prettyPrint: true });
  console.log(xml);
  return xml;
}

export function generateResponseHeaders(res: Response) {
  res.set({
    'x-amz-version-id': 1,
  });
}