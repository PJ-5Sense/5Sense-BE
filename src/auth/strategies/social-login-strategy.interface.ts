import { SocialLogin } from '../types/social-login.type';

// social-login-strategy.interface.ts
export interface SocialLoginStrategy {
  login(code: string, state: string): Promise<SocialLogin>;
}
