import * as cdk from '@aws-cdk/core';
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import { Runtime } from "@aws-cdk/aws-lambda";
import { Role, ServicePrincipal, PolicyStatement } from "@aws-cdk/aws-iam"
import { Bucket } from "@aws-cdk/aws-s3";

export class LocalstackWorkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "local-stack-on-github-actions-test", {
      bucketName:"local-stack-on-github-actions-test"
    });

    const lambdaRole = new Role(
      this,
      `localstack-on-github-actions-role`,
      {
        roleName: `localstack-on-github-actions-role`,
        assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      },
    );
    lambdaRole.addToPolicy(
      new PolicyStatement({
        resources: [bucket.bucketArn,bucket.arnForObjects("*")],
        actions: [
          "s3:GetObject",
          "s3:ListBucket",
        ],
      }),
    );

    const lambda = new NodejsFunction(this, "local-stack-on-github-actions-lambda", {
      entry: "./src/lambda/handler.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_12_X,
      functionName: "local-stack-on-github-actions-test",
      memorySize: 128,
      role: lambdaRole,
      environment: {
        S3_CLIENT_PARAM: JSON.stringify({
          region: this.region,
          signatureVersion: "v4",
        }),
        BUCKET_NAME: bucket.bucketName
      },
    });
  }
}
