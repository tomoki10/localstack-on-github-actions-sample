import * as AWS from "aws-sdk";
//
import { S3Client } from "./s3-client"

const S3_CLIENT_PARAM = process.env.S3_CLIENT_PARAM!;
const s3 = new AWS.S3(JSON.parse(S3_CLIENT_PARAM));
const BUCKET_NAME = process.env.BUCKET_NAME!;

interface Event {
  fileName: string;
}

export const handler = async (event: Event) => {
  const s3Client = new S3Client(s3,{
    Bucket: BUCKET_NAME,
    Key: event.fileName
  });

  const result = await s3Client.getObject();
  console.log(result)
}
