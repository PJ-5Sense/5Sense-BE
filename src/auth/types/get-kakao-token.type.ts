// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token
export type KaKaoRequireData = {
  grant_type: string;
  code: string;
  state: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
};
