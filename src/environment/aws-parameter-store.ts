import { GetParameterCommand, SSMClient, SSMClientConfig } from '@aws-sdk/client-ssm';
/**
 * AWS Parameter Store를 이용해 저장한 값을 가져옵니다
 * @param name 환경변수 저장 파일의 이름
 * @returns
 */
export async function getValue(name: string): Promise<object> {
  const command = new GetParameterCommand({
    Name: `/oh-sense/${name}`,
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
  return JSON.parse(value);
}
