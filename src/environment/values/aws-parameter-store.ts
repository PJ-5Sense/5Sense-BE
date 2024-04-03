import { GetParameterCommand, SSMClient, SSMClientConfig } from '@aws-sdk/client-ssm';

async function getValue(): Promise<string> {
  const command = new GetParameterCommand({
    Name: `test`,
    WithDecryption: true,
  });
  const ssmClientConfig: SSMClientConfig = {
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: 'accesskey',
      secretAccessKey: 'secretkey',
    },
  };
  const ssmClient: SSMClient = new SSMClient(ssmClientConfig);
  const response = await ssmClient.send(command);
  const value = response.Parameter.Value;
  return value;
}
