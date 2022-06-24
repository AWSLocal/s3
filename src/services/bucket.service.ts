import { FsRespository } from '../repositories/fs.repository';
import { S3 } from './s3.service';

export class BucketService {
  private s3: S3;

  private fs: FsRespository;

  constructor(s3: S3, fs: FsRespository) {
    this.s3 = s3;
    this.fs = fs;
  }

  async create(bucket: string) {
    this.fs.mkDir(bucket);
  }

  async delete(bucket: string) {
    this.fs.rmDir(bucket);
  }
}