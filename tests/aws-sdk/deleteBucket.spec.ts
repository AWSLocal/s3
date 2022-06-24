import { S3 } from 'aws-sdk';

const s3 = new S3({
  endpoint: 'http://localhost:3000/',
});

describe('deleteBucket', () => {
  it('is defined', async () => {
    await s3.deleteBucket({
      Bucket: 'BUCKET2',
    }).promise();
  });
});
