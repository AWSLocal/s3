import { S3 } from 'aws-sdk';

const s3 = new S3({
  endpoint: 'http://localhost:3000/',
});

describe('copyObject', () => {
  it('is defined', async () => {
    const result = await s3.copyObject({
      CopySource: 'BUCKET1/FOLDER1/KEY',
      Bucket: 'BUCKET2',
      Key: 'NEW/KEY',
    }).promise();
    console.log(result);
  });
});
