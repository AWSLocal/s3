import { S3 } from 'aws-sdk';

const s3 = new S3({
  endpoint: 'http://localhost:3000/',
});

describe('createBucket', () => {
  it('is defined', async () => {
    await s3.createBucket({
      Bucket: 'TEST_BUCKET',
    }).promise();
  });
});
