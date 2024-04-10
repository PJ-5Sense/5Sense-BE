/**
 * 소셜로그인에 사용되는 필수 속성
 *
 * @see /src/environment/values/google.config.ts
 * @see /src/environment/values/kakao.config.ts
 * @see /src/environment/values/naver.config.ts
 */
export type SocialConfig = {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  admin_key: string;
};
