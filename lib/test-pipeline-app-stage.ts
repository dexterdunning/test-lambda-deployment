import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { LambdaStack } from './test-pipeline-lambda-stack';

export class TestPipelineAppStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);

      const lambdaStack = new LambdaStack(this, 'LambdaStack');
    }
}
