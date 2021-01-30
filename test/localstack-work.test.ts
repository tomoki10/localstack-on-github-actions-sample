import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as LocalstackWork from '../lib/localstack-work-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LocalstackWork.LocalstackWorkStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
