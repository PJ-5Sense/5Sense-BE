import { GetParameterCommand, SSMClient, SSMClientConfig } from '@aws-sdk/client-ssm';
/**
 * AWS Parameter Store를 이용해 저장한 값을 가져옵니다
 * @param name 환경변수 저장 파일의 이름
 * @returns env
 */
export async function getValue(name: string): Promise<any> {
  const command = new GetParameterCommand({
    Name: `/${process.env.AWS_ENV_STORE_PATH}/${name}`,
    WithDecryption: true,
  });
  const ssmClientConfig: SSMClientConfig = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
  const ssmClient: SSMClient = new SSMClient(ssmClientConfig);
  const response = await ssmClient.send(command);
  const value = response.Parameter.Value;
  return JSON.parse(value);
}
