import { FsRespository } from '../repositories/fs.repository';
import { BucketService } from './bucket.service';
import { ObjectService } from './object.service';

export class S3 {
  fs: FsRespository;

  object: ObjectService;

  bucket: BucketService;

  constructor() {
    this.fs = new FsRespository();
    this.object = new ObjectService(this, this.fs);
    this.bucket = new BucketService(this, this.fs);
  }
}