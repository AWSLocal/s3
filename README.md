# s3

A s3 compatible service that stores files on the local filesystem.

# TODO
- how to differentiate different requests?

# Design
Uses (raw-body)[https://www.npmjs.com/package/raw-body] to get Body data.

## Suported Actions
- CreateBucket
- DeleteBucket
- CopyObject
- CreateMultipartUpload
- CompleteMultipartUpload
- AbortMultipartUpload
- DeleteObject
- DeleteObjects
- GetObject
- ListBuckets
- ListObjects
- ListObjectsV2
- PutObject
- UploadPart

## Unsupported
- Tagging
- Versioning
- Policies