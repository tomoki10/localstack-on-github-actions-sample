#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { LocalstackWorkStack } from "../lib/localstack-on-github-actions-sample-stack";

const app = new cdk.App();
new LocalstackWorkStack(app, "LocalstackWorkStack");
