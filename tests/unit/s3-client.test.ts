import * as fs from "fs";
import * as path from "path";
import * as AWS from "aws-sdk";
import { S3Client } from "../../src/lambda/s3-client";

const bucketName = "test";
const testFileName = "event.json";

const s3 = new AWS.S3({
  region: "ap-northeast-1",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
  endpoint: new AWS.Endpoint("http://localhost:4566")
});

// takes time to execute LocalStack
jest.setTimeout(10000);

describe("getObject", () => {
  beforeAll(async () => {
    await s3.createBucket({ Bucket: bucketName }).promise();
    await s3.putObject({
       Bucket: bucketName,
       Key: testFileName,
       Body: fs.readFileSync(
         path.join(__dirname, "events", testFileName)
       ),
    }).promise();
  });
  afterAll(async () => {
    const deleteObjects: AWS.S3.Types.ListObjectsOutput = await s3.listObjects({ Bucket: bucketName }).promise();
    if(deleteObjects.Contents){
      for (const deleteObject of deleteObjects.Contents){
        await s3.deleteObject({Bucket: bucketName, Key: deleteObject.Key as string }).promise();
      }
    }
    await s3.deleteBucket({ Bucket: bucketName }).promise();
  });
  test("get s3 object", async () => {
    const s3Client = new S3Client(
      s3,
      {
        Bucket: bucketName,
        Key: testFileName
      }
    );
    const result = await s3Client.getObject();

    const expectFile = fs.readFileSync(path.join(__dirname, "events", testFileName)).toString();

    expect(result).toEqual(expectFile);
  });
});
