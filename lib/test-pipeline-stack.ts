import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { TestPipelineAppStage } from './test-pipeline-app-stage';

export class TestPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('dexterdunning/test-lambda-deployment', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });

    pipeline.addStage(new TestPipelineAppStage(this, 'StageInPipelineAccount', {
        env: { account: '736189176631', region: 'us-west-2'}
    }));

    // pipeline.addStage(new TestPipelineAppStage(this, 'StageInDevAccount', {
    //     env: { account: '075626608000', region: "us-west-2"}
    // }));
  }
}
