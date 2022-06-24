import { Request } from 'express';
import { FsRespository } from '../repositories/fs.repository';

const fsRepo = new FsRespository();

export class S3 {
  putObject(req: Request, buffer: Buffer) {
    const { bucket, key } = req.params;
    fsRepo.put(bucket, key, buffer);
  }

  copyObject() {
    console.log('copyObject');
    return {
      CopyObjectResult: {
        LastModified: 'text',
        ETag: 'text',
      },
    };
  }
}