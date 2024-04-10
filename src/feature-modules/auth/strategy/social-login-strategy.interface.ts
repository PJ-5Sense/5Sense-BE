import { SocialLogin } from '../type/social-login.type';

// social-login-strategy.interface.ts
export interface SocialLoginStrategy {
  login(code: string, state: string): Promise<SocialLogin>;
}
