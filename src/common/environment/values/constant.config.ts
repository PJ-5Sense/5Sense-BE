import { IsUrl } from 'class-validator';
import ValidateConfig from '../environment.validator';
import { getValue } from '../aws-parameter-store';

export class ConstantConfig {
  @IsUrl()
  DEFAULT_PROFILE: string;
}
export default async () => {
  let env = {
    DEFAULT_PROFILE: process.env.DEFAULT_PROFILE,
  };

  if (process.env.NODE_ENV !== 'local') {
    env = await getValue('constant');
  }

  ValidateConfig(env, ConstantConfig);

  return { DEFAULT_PROFILE: env };
};
