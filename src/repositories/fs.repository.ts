import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { S3_DATA_LOCATION } from '../constants';

export class FsRespository {
  constructor() {
    const s3Dir = join(S3_DATA_LOCATION);
    if (!existsSync(s3Dir)) {
      mkdirSync(s3Dir);
    }
  }
  /**
   * For now will just store a file with the name `/bucket/key` url encoded
   */

  read() {

  }

  async put(bucket: string, key: string, data: Buffer) {
    await writeFile(this.generateFilename(bucket, key), data);
  }

  generateFilename(bucket: string, key: string) {
    const name = encodeURIComponent(`${bucket}/${key}`);
    return join(S3_DATA_LOCATION, name);
  }
}