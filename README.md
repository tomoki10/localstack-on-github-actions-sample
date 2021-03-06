# LocalStack on GitHub Actions sample

This is a LocalStack on GitHub Actions sample project.

As an example, I will create a function that Lambda to retrieve an S3 object. Replace S3 with LocalStack and test the code.

## Getting Started

Fork this repository.You can verify that it works by creating a PR.(Or change the pull_request part to push, etc.)

If you want to check the code, get the source.

```
git clone https://github.com/tomoki10/localstack-on-github-actions-sample.git
```


```
/.gihub/workflows/main.yml

name: CI

on:
  pull_request:
    branches: [ master ]
```

### Local Test

Start LocalStack on Docker using docker-compose.
```
$ docker-compose -f fake-service.yml up -d
```

Create node_modules with yarn. When you're done, run the unit test.
```
$ yarn
$ yarn unit-test
```

### Other

When deploying with CDK, please change the S3 bucket name to something unique.

/lib/localstack-on-github-actions-sample-stack.ts

```
  const bucket = new Bucket(this, "local-stack-on-github-actions-test", {
      bucketName: "***something unique name***"
  });
```
