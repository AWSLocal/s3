import { FsRespository } from '../repositories/fs.repository';
import { S3 } from './s3.service';

export class ObjectService {
  private s3: S3;

  private fs: FsRespository;

  constructor(s3: S3, fs: FsRespository) {
    this.s3 = s3;
    this.fs = fs;
  }

  async put(bucket: string, key: string, buffer: Buffer) {
    await this.fs.put(bucket, key, buffer);
  }

  async copy(destBucket: string, destKey: string, source: string) {
    await this.fs.copy(destBucket, destKey, source);

    return {
      CopyObjectResult: {
        LastModified: '0000000000000',
        ETag: 'text',
      },
    };
  }

  async delete(bucket: string, key: string) {
    await this.fs.rm(bucket, key);
  }

  async deleteMany(bucket: string, xml: Record<string, any>) {
    const deleteArr = xml.Delete.Object;
    const successful: string[] = [];
    const failed: string[] = [];
    for (let i = 0; i < deleteArr.length; i++) {
      const deleteObject = deleteArr[i];
      const key = deleteObject.Key[0];
      console.log(key);
      try {
        await this.delete(bucket, key);
        successful.push(key);
      } catch (e) {
        failed.push(key);
      }
    }
    console.log({
      successful,
      failed,
    });
    return {
      DeleteResult: {
        $: {
          xmlns: 'http://s3.amazonaws.com/doc/2006-03-01/',
        },
        Deleted: [
          ...successful.map(key => ({
            Key: key,
          })),

        ],
        Error: [
          ...failed.map(key => ({
            Key: key,
            Code: 'Error',
            Message: 'Error occured',
          })),
        ],
      },
    };
  }
}