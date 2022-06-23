import { S3 } from 'aws-sdk';

const s3 = new S3({
  endpoint: 'http://localhost:3000/',
});

describe.skip('copyObject', () => {
  it('is defined', async () => {
    await s3.copyObject({
      CopySource: 'COPYSOURCE',
      Bucket: 'BUCKET',
      Key: 'KEY',
    }).promise();
  });
});
