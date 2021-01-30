import * as AWS from "aws-sdk";

export class S3Client {
  s3Client: AWS.S3;
  s3GetObjectParam: AWS.S3.GetObjectRequest;

  constructor(s3Client: AWS.S3, s3GetObjectParam: AWS.S3.GetObjectRequest){
    this.s3Client = s3Client;
    this.s3GetObjectParam = s3GetObjectParam;
  };

  getObject = async () => {
    const s3Object = await this.s3Client.getObject(this.s3GetObjectParam).promise();
    return s3Object.Body!.toString();
  }
}
