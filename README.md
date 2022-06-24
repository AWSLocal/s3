# s3

A s3 compatible service that stores files on the local filesystem.

# TODO
- depending on env var use a flat directory structure or proper one (encode / or don't)
- return proper error messages

# Design
Uses (raw-body)[https://www.npmjs.com/package/raw-body] to get Body data.

## Suported Actions
- [X] CreateBucket
- [X] DeleteBucket
- [X] CopyObject
- [X] DeleteObject
- [ ] DeleteObjects
- [ ] GetObject
- [ ] ListBuckets
- [ ] ListObjectsV2
- [X] PutObject 
- ### Maybe
- [ ] ListObjects
- [ ] CreateMultipartUpload
- [ ] UploadPart
- [ ] CompleteMultipartUpload
- [ ] AbortMultipartUpload

## Unsupported
- Tagging
- Versioning
- Policies