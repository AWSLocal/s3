import { existsSync, mkdirSync } from 'fs';
import { copyFile, mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { S3_DATA_LOCATION } from '../constants';

export class FsRespository {
  constructor() {
    const s3Dir = join(S3_DATA_LOCATION);
    if (!existsSync(s3Dir)) {
      mkdirSync(s3Dir);
    }
  }

  private split(location: string) {
    const [bucket, ...rest] = location.split('/');

    return {
      bucket,
      key: rest.join('/'),
    };
  }

  private encodeKey(key: string) {
    return encodeURIComponent(key);
  }

  private generateFileLocation(bucket: string, key: string) {
    return join(S3_DATA_LOCATION, bucket, this.encodeKey(key));
  } 
  
  read() {

  }

  async mkDir(bucket: string) {
    await mkdir(join(S3_DATA_LOCATION, bucket));
  }

  async rmDir(bucket: string) {
    await rm(join(S3_DATA_LOCATION, bucket), {
      recursive: true,
      force: true,
    });
  }

  async put(bucket: string, key: string, data: Buffer) {
    await writeFile(this.generateFileLocation(bucket, key), data);
  }

  async copy(destBucket: string, destKey: string, source: string) {
    const destLocation = this.generateFileLocation(destBucket, destKey);

    const {
      key: sourceKey,
      bucket: sourceBucket,
    } = this.split(source);

    const sourceLocation = this.generateFileLocation(sourceBucket, sourceKey); 

    try {
      await copyFile(sourceLocation, destLocation);
      return true;
    } catch {
      return false;
    }
  }

  async rm(bucket: string, key: string) {
    const location = this.generateFileLocation(bucket, key);

    await rm(location);
  }
}