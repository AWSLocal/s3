import { S3 } from 'aws-sdk';

const s3 = new S3({
  endpoint: 'http://localhost:3000/',
});

describe('s3', () => {
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
  
  describe('putObject', () => {
    it('is defined', async () => {
      await s3.putObject({
        Bucket: 'BUCKET1',
        Key: 'FOLDER1/KEY',
        Body: 'BODY',
      }).promise();
    });
  });

  describe('deleteObject', () => {
    it('is defined', async () => {
      await s3.deleteObject({
        Bucket: 'BUCKET1',
        Key: 'FOLDER1/KEY',
      }).promise();
    });
  });

  describe('deleteObjects', () => {
    it('is defined', async () => {
      const result = await s3.deleteObjects({
        Bucket: 'BUCKET1',
        Delete: {
          Objects: [
            {
              Key: 'KEY2',
            },
            {
              Key: 'KEY3',
            },
          ],
        },
      }).promise();
      console.log(result);
    });
  });

  describe('getObject', () => {
    it('is defined', async () => {
      console.log(
        await s3.getObject({
          Bucket: 'BUCKET1',
          Key: 'FOLDER1/KEY',
        }).promise(),
      );
    });
  });

  describe('createBucket', () => {
    it('is defined', async () => {
      await s3.createBucket({
        Bucket: 'TEST_BUCKET',
      }).promise();
    });
  });  

  describe('deleteBucket', () => {
    it('is defined', async () => {
      await s3.deleteBucket({
        Bucket: 'BUCKET2',
      }).promise();
    });
  });
  
});
