import { S3 } from 'aws-sdk';

const s3 = new S3({
  endpoint: 'http://localhost:3000/',
});

describe('putObject', () => {
  it('is defined', async () => {
    await s3.putObject({
      Bucket: 'BUCKET1',
      Key: 'FOLDER1/KEY',
      Body: 'BODY',
    }).promise();
  });
});
