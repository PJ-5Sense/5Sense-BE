import { IsUrl } from 'class-validator';
import ValidateConfig from '../environment.validator';

export class ConstantConfig {
  @IsUrl()
  DEFAULT_PROFILE: string;
}
export default () => {
  const env = {
    DEFAULT_PROFILE: process.env.DEFAULT_PROFILE,
  };

  ValidateConfig(env, ConstantConfig);

  return { DEFAULT_PROFILE: env };
};
